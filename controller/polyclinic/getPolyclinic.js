const Polyclinic = require("../../models/polyclinic");
const { handleError } = require("../../middleware/utils");
const { getContents } = require("../../middleware/db");
const { getPolyclinicInDb } = require("./helpers");
const mongoose = require("mongoose");
/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPolyclinic = async (req, res) => {
  try {
    const code = req.query.code;
    console.log("CODE", code);
    let query = {};

    if (code !== undefined) {
      query = {
        code,
      };
    }

    res.status(200).json(await getPolyclinicInDb(query, Polyclinic));
  } catch (error) {
    console.error(error.data ?? error);
    handleError(res, error.data ?? error);
  }
};

module.exports = { getPolyclinic };
