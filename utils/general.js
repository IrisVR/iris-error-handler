const errorTable = require('../errorTable');
const mdb = require('./mongodb');

/**
 * Extracts an internal error code from various error types.
 *
 * Calls a helper method if the error is related to MongoDB
 * validation. Otherwise, the error is expected to be a custom
 * JS error object, where the `message` field is always be the
 * error code.
 *
 * For example, the original error can look like this: Error(101).
 */
exports.handleError = res => (err) => {
  let code;
  if (err.errors) code = mdb._handleValidationError(err);
  else code = err.message;
  this.sendError(res, code);
};

/**
 * Accepts an internal error code and responds with
 * the associated error type + error message, along
 * with an HTTP status of 200.
 */
exports.sendError = (res, code) => {
  const defaultError = errorTable['-1'];
  const body = errorTable[code] || defaultError;
  res.status(200).send(body);
};
