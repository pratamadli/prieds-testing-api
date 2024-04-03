const Polyclinic = require("../../../models/polyclinic");
const {
  buildErrObject,
  itemNotFound,
  buildSuccResp,
  buildErrResp,
} = require("../../../middleware/utils");
const mongoose = require("mongoose");

/**
 * Creates a new ability in database
 * @param {Object} req - request object
 */
const createPolyclinicInDb = ({ code = "", name = "" }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const model = new Polyclinic({ code, name });
      const polyclinic = await model.save();
      resolve(buildSuccResp(polyclinic));
    } catch (err) {
      reject(buildErrObject(422, err.message));
    }
  });
};

module.exports = { createPolyclinicInDb };
