/**
 * Builds success object
 * @param {string} message - success text
 */
const buildErrResp = (data = null, message = "FAILED_TO_GET_RESPONSE") => {
    return {
      success: false,
      data: data,
      message: message,
    };
  };
  
  module.exports = { buildErrResp };
  