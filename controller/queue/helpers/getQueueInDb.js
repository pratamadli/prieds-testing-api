const {
  buildSuccResp,
  buildErrObject,
  buildErrResp,
} = require("../../../middleware/utils");

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const getQueueInDb = (query = {}, model = {}, select = "", sort = {}) => {
  return new Promise((resolve, reject) => {
    model
      .find(query, select, sort)
      .then((data) => {
        try {
          console.log("DATA", data);
          let result = [];

          result = data || [];

          resolve(buildSuccResp(result));
        } catch (error) {
          resolve(buildErrResp([]));
        }
      })
      .catch((error) => {
        console.error("error", error.message);
        reject(buildErrObject(422, error.message));
      });
  });
};

module.exports = { getQueueInDb };
