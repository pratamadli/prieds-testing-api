const { handleError } = require("../../middleware/utils");
const { createQueueInDb } = require("./helpers");

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createQueue = async (req, res) => {
  try {
    const body = req.body;
    const item = await createQueueInDb(body);
    res.status(201).json(item);
  } catch (error) {
    handleError(res, error.data ?? error);
  }
};

module.exports = { createQueue };
