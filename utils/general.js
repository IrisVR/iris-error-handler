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
  if (err.errors) code = mdb.handleMongoDBError(err);
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

function isValidObjectID(id) {
  return id.toString().match(/^[0-9a-fA-F]{24}$/);
}

exports.validateObjectID = id =>
  new Promise((resolve, reject) =>
    isValidObjectID(id)
      ? resolve(id)
      : reject(Error(150))
  );

/**
 * Verifies that request is being made by the
 * appropriate owner, as opposed to any Iris user.
 */
exports.validateOwner = user => document =>
  new Promise((resolve, reject) =>
    (user.username === document.owner.username)
      ? resolve(document)
      : reject(Error(350))
  );

/**
 * Helper for associating missing document types
 * with error codes.
 */
function convertNotFoundCategoryToCode(category) {
  const correspondingCodes = {
    default: 160,
    userEmail: 203,
    userId: 204,
    pano: 300,
    panoset: 310,
    project: 320,
    publicSharingCode: 330,
    notification: 610,
  };
  return correspondingCodes[category];
}

/**
 * Checks whether a document(s) exists in the DB.
 */
exports.handleEntityNotFound = (entity, category = 'default') =>
  new Promise((resolve, reject) =>
    entity
      ? resolve(entity)
      : reject(Error(convertNotFoundCategoryToCode(category)))
  );
