const { itemNotFound, buildSuccResp, buildErrResp } = require("../utils");

/**
 * Updates an item in database by id
 * @param {string} id - item id
 * @param {Object} req - request object
 */
const updateContent = (id = "", model = {}, req = {}, message = "") => {
  return new Promise((resolve, reject) => {
    // console.log("id", id);
    // console.log("model", model);
    // console.log("req", req);
    model.findByIdAndUpdate(
      id,
      req,
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
      async (err, item) => {
        try {
          await itemNotFound(err, item, "NOT_FOUND");

          resolve(buildSuccResp(item, message));
        } catch (error) {
          console.error(error);
          reject(buildErrResp(error));
        }
      }
    );
  });
};

module.exports = { updateContent };
