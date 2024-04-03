const Queue = require("../../models/queue");
const { handleError } = require("../../middleware/utils");
const { getContents } = require("../../middleware/db");
const { getQueueInDb } = require("./helpers");
const mongoose = require("mongoose");
/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getQueue = async (req, res) => {
  try {
    const queueNumber = req.query.queueNumber;
    let query = {};

    if (queueNumber !== undefined) {
      query = {
        queueNumber,
      };
    }

    res.status(200).json(await getQueueInDb(query, Queue));
  } catch (error) {
    console.error(error.data ?? error);
    handleError(res, error.data ?? error);
  }
};

module.exports = { getQueue };
