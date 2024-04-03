const { buildSuccObject, itemNotFound } = require("../utils");

/**
 * Deletes an item from database by id
 * @param {string} id - id of item
 */
const deleteContent = (id = "", model = {}) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndRemove(id, async (err, item) => {
      try {
        await itemNotFound(err, item, "NOT_FOUND");
        resolve(buildSuccObject("DELETED"));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
};

module.exports = { deleteContent };
