const { itemNotFound, buildSuccResp, buildErrObject } = require("../utils");

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param {Object} query - query object
 */
const getContents = (
  query = {},
  model = {},
  select = "",
  sort = {},
  limit = 0
) => {
  return new Promise((resolve, reject) => {
    if (limit > 0) {
      model
        .find(query, select, sort, async (err, item) => {
          try {
            await itemNotFound(err, item, "NOT_FOUND");
            resolve(buildSuccResp(item));
          } catch (error) {
            console.error(error);
            reject(buildErrObject(error));
          }
        })
        .limit(limit);
    } else {
      model.find(query, select, sort, async (err, item) => {
        try {
          await itemNotFound(err, item, "NOT_FOUND");
          resolve(buildSuccResp(item));
        } catch (error) {
          console.error(error);
          reject(buildErrObject(error));
        }
      });
    }
  });
};

module.exports = { getContents };
