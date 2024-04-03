const { itemNotFound, buildSuccResp, buildErrResp } = require("../utils");

/**
 *
 * @param {*} query
 * @param {*} model
 * @param {*} select
 * @param {*} sort
 * @returns
 */
const getContent = (query = {}, model = {}, select = "", sort = {}) => {
  return new Promise((resolve, reject) => {
    model.findOne(query, select, sort, async (error, item) => {
      try {
        // await itemNotFound(error, item, "NOT_FOUND");
        resolve(buildSuccResp(item));
      } catch (error) {
        console.log("error getContent()", error);
        reject(buildErrResp(error));
      }
    });
  });
};

module.exports = { getContent };
