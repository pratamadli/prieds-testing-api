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
    const token = req.query.token;
    let query = {};

    if (token !== undefined) {
      query.token = token;
    }

    const sort = {
      sort: { polyclinicCode: 1, queueNumber: 1 },
    };

    res.status(200).json(await getQueueInDb(query, Queue, "", sort));
  } catch (error) {
    console.error(error.data ?? error);
    handleError(res, error.data ?? error);
  }
};

module.exports = { getQueue };
