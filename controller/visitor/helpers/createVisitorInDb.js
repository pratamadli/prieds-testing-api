const Visitor = require("../../../models/visitor");
const { buildErrObject, buildSuccResp } = require("../../../middleware/utils");
const mongoose = require("mongoose");
const moment = require("moment");
const { getContents } = require("../../../middleware/db");

/**
 * Creates a new journey in database
 * @param {Object} req - request object
 */
const createVisitorInDb = ({
  firstName,
  lastName,
  idCard,
  birthDate,
  sex,
  height,
  weight,
  contactNumber,
  email,
  address,
  city,
  province,
  emergencyContactName,
  emergencyContactNumber,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const now = moment().format("YYMMDD");
      const startOfDay = moment().startOf("day");
      const endOfDay = moment().endOf("day");
      const latestVisitor = await Visitor.findOne({
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      }).sort({
        visitorNumber: -1,
      });
      console.log("LATEST", latestVisitor);
      let newVisitorNumber = "0001";

      if (latestVisitor) {
        const lastFourDigits = parseInt(
          latestVisitor.visitorNumber.slice(-4),
          10
        );
        newVisitorNumber = (lastFourDigits + 1).toString().padStart(4, "0");
      }

      const visitorNumber = now + newVisitorNumber;

      const model = new Visitor({
        visitorNumber,
        firstName,
        lastName,
        idCard,
        birthDate,
        sex,
        height,
        weight,
        contactNumber,
        email,
        address,
        city,
        province,
        emergencyContactName,
        emergencyContactNumber,
      });
      const data = await model.save();
      resolve(buildSuccResp(data));
    } catch (err) {
      reject(buildErrObject(422, err.message));
    }
  });
};

module.exports = { createVisitorInDb };
