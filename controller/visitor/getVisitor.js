const Visitor = require("../../models/visitor");
const { handleError } = require("../../middleware/utils");
const { getContents } = require("../../middleware/db");
const { getVisitorInDb } = require("./helpers");
const mongoose = require("mongoose");
/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getVisitor = async (req, res) => {
  try {
    const visitorNumber = req.query.visitorNumber;
    let query = {};

    if (visitorNumber !== undefined) {
      query = {
        visitorNumber,
      };
    }

    res.status(200).json(await getVisitorInDb(query, Visitor));
  } catch (error) {
    console.error(error.data ?? error);
    handleError(res, error.data ?? error);
  }
};

module.exports = { getVisitor };
