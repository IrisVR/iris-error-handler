const errorTable = require('../../errorTable');

/**
 * Error handling for Chargebee-specific errors
 */
exports.sendChargebeeError = (res, message) => {
  const body = errorTable[1010];
  body.meta.error_message = message;
  res.status(200).send(body);
};
