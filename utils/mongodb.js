/**
 * Handler for `required field` errors
 * thrown by MongoDB
 */
function handleMissingField(field) {
  const correspondingCodes = {
    username: 200,
    password: 205,
    full_name: 210
  };
  return correspondingCodes[field];
}

/**
 * Handler for all validation errors
 * thrown by MongoDB
 */
exports.handleMongoDBError = (err) => {
  /**
   * MongoDB returns _all_ validation errors.
   * We'll save these in an array in case we
   * decide to use them in the future, but for
   * now we'll only return the first error to
   * go with a single error code.
   */
  const errors = [];
  for (const key in err.errors) {
    errors.push(err.errors[key]);
  }
  const firstError = errors[0];
  let code;
  if (firstError.kind === 'required') code = handleMissingField(firstError.path);

  /**
   * If the error is not a `required field` error,
   * we will examine the `message` key to be our
   * internal code as specified in the model's
   * validator.
   */
  else code = firstError.message;
  return code;
};
