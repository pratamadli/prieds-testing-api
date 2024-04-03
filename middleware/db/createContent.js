const { buildErrObject } = require("../utils");

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createContent = (req = {}, model = {}) => {
  return new Promise((resolve, reject) => {
    model.create(req, (error, item) => {
      if (error) {
        console.error(error);
        reject(buildErrObject(422, error.message));
      }
      resolve(item);
    });
  });
};

module.exports = { createContent };
