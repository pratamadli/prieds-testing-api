const Queue = require("../../../models/queue");
const Visitor = require("../../../models/visitor");
const Polyclinic = require("../../../models/polyclinic");
const { buildErrObject, buildSuccResp } = require("../../../middleware/utils");
const mongoose = require("mongoose");
const moment = require("moment");
const { getContents } = require("../../../middleware/db");
const { getVisitorInDb } = require("../../visitor/helpers");
const { getPolyclinicInDb } = require("../../polyclinic/helpers");
const { getQueueInDb } = require("./getQueueInDb");

/**
 * Creates a new journey in database
 * @param {Object} req - request object
 */
const createQueueInDb = ({ visitorNumber, payment, polyclinicCode }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const startOfDay = moment().startOf("day");
      const endOfDay = moment().endOf("day");
      const query = {
        visitorNumber: visitorNumber,
      };
      // let visitorData = await getContents(query, Visitor);
      let visitorData = await getVisitorInDb(query, Visitor);
      console.log("VISITOR DATA", visitorData);
      visitorData = visitorData.data;

      if (visitorData.length <= 0) {
        return reject(buildErrObject(422, "VISITOR DOES NOT EXIST"));
      }

      let paymentCode;
      if (payment === "private") {
        paymentCode = "A";
      } else if (payment === "insurance") {
        paymentCode = "B";
      } else {
        return reject(buildErrObject(422, "PAYMENT METHOD DOES NOT EXIST"));
      }

      let polyclinicData = await getPolyclinicInDb(
        { code: polyclinicCode },
        Polyclinic
      );
      polyclinicData = polyclinicData.data;

      console.log("polyclinicData", polyclinicData);

      const polyclinicName = polyclinicData[0].name;

      if (polyclinicData.length <= 0) {
        return reject(buildErrObject(422, "POLYCLINIC DOES NOT EXIST"));
      }

      let existingQueue = await getQueueInDb(
        {
          visitorNumber: visitorNumber,
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        },
        Queue
      );

      existingQueue = existingQueue.data;

      if (existingQueue.length > 0) {
        return reject(
          buildErrObject(422, "QUEUE ENTRY ALREADY EXISTS FOR TODAY")
        );
      }

      let latestQueue = await getQueueInDb(
        {
          polyclinicCode: polyclinicCode,
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        },
        Queue,
        "",
        {
          sort: { queueNumber: -1 },
        }
      );

      latestQueue = latestQueue?.data[0] || null;
      console.log("LATEST QUEUE", latestQueue);
      let queueNumber = 1;
      if (latestQueue !== null) {
        queueNumber = latestQueue.queueNumber + 1;
        console.log("QUEUE NUMBER", queueNumber);
      }

      // Ensure queue number is represented in three digits
      const paddedQueueNumber = String(queueNumber).padStart(3, "0");

      // Construct the token
      const token = `${paymentCode}-${polyclinicCode}-${paddedQueueNumber}`;
      const status = "queue";
      const model = new Queue({
        visitorNumber,
        token,
        queueNumber,
        payment,
        polyclinicCode,
        polyclinicName,
        status,
      });
      const data = await model.save();
      resolve(buildSuccResp(data));
    } catch (err) {
      console.error("err", err);
      reject(buildErrObject(422, err.message));
    }
  });
};

module.exports = { createQueueInDb };
