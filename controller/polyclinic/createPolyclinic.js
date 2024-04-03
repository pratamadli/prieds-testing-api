const { handleError } = require("../../middleware/utils");
const { createPolyclinicInDb } = require("./helpers");

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createPolyclinic = async (req, res) => {
  try {
    console.log("REQ", req.body);
    const body = req.body;
    const item = await createPolyclinicInDb(body);
    res.status(201).json(item);
  } catch (error) {
    console.error(error.data ?? error);
    handleError(res, error.data ?? error);
  }
};

module.exports = { createPolyclinic };
