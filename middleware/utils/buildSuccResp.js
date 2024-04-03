/**
 * Builds success object
 * @param {string} message - success text
 */
const buildSuccResp = (
  data = null,
  message = "SUCCESS_TO_GET_RESPONSE",
  date_start = null,
  date_end = null,
  description = ""
) => {
  return {
    success: true,
    data: data,
    message: message,
    date_start: date_start,
    date_end: date_end,
    description: description,
  };
};

module.exports = { buildSuccResp };
