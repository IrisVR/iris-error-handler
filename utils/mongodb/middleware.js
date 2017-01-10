const utils = require('./helpers');

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
 * Checks whether a document(s) exists in the DB.
 */
exports.handleEntityNotFound = (entity, category = 'default') =>
  new Promise((resolve, reject) =>
    entity
      ? resolve(entity)
      : reject(Error(utils._getCorrespondingCode('notFound', category)))
  );
