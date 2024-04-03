const { buildErrObject } = require("./buildErrObject");
const { buildErrResp } = require("./buildErrResp");
const { buildSuccResp } = require("./buildSuccResp");
const { buildSuccObject } = require("./buildSuccObject");
const { handleError } = require("./handleError");
const { itemNotFound } = require("./itemNotFound");
const { removeExtensionFromFile } = require("./removeExtensionFromFile");

module.exports = {
  buildErrObject,
  buildErrResp,
  buildSuccResp,
  buildSuccObject,
  handleError,
  itemNotFound,
  removeExtensionFromFile,
};
