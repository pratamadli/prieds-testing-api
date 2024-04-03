/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  // Prints error in console
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }
  // Sends error to user

  let errorCode = 500;

  let errorMessage = "SERVER_ERROR";

  if (err.code > 0) {
    errorCode = err.code;
  }

  if (err.message != "") {
    errorMessage = err.message;
  }

  res.status(errorCode).json({
    errors: {
      msg: errorMessage,
    },
  });
};

module.exports = { handleError };
