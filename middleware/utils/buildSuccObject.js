/**
 * Builds success object
 * @param {string} message - success text
 */
const buildSuccObject = (message = "") => {
    return {
      message: message,
    };
  };
  
  module.exports = { buildSuccObject };
  