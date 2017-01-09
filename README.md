# Iris Error Handler
Error handling middleware for IrisVR microservices.

Compatible with Node.js + Express apps only, with an optional MongoDB backend.

## Installation (TODO: ACTUALLY PUBLISH ON NPM)
```
$ npm install iris-error-handler --save
```

## Initialization
```javascript
const errorHandler = require('iris-error-handler');
```

## Error Table
You may conjure the list of [internal Iris error codes](https://github.com/IrisVR/iris-error-handler/blob/master/errorTable.js) and their respective messages like this:

```javascript
const errorTable = require('iris-error-handler').errorTable;
```

The error code acts as the key, while the value contains the meta payload to be returned to the client. The meta object contains the following fields:
- `code`: An integer value that categorizes the type of response according to our internal status code library. _This number is unrelated to a standard HTTP status code_.
- `error_type`: A brief description of the error.
- `error_message`: A string that describes error in full detail.

### Organization
- **-1**: Unknown error. This is the default error returned by the middleware if no error code is specified.
- **1 - 99**: Third-party errors
- **100 - 149**: Request header errors
- **150 - 199**: MongoDB errors
- **200 - 299**: User / Password errors
- **300 - 399**: Library errors
- **400 - 499**: Team errors
- **500 - 599**: Billing errors
- **600 - 699**: Notification errors

### Example
```javascript
{
  ...
  202: {
    meta: {
      code: 202,
      error_type: 'UsernameTaken',
      error_message: 'The username is already registered'
    }
  },
  ...
}
```

## API
```javascript
const errorUtils = require('iris-error-handler').utils;
```

### General
#### handleError(res)(err)
Currying function that accepts an [Express response object](http://expressjs.com/es/api.html#res) and an error argument. This method internally triggers [`sendError`](#senderror-res--code-) for ultimately sending the response back to the client.

The error passed in must be one of two types:
- A [Javascript Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) in the form of `Error(X)`, where `X` denotes an Iris error code.

###### Example
```javascript
/**
 * route.js
 */
// Arbitrary error thrower
function calculate() {
  return Promise.reject(Error(101));
};

// Route handler
const calculateNumber = (req, res) => 
  calculate(req.body)
    .then(n => res.send(n))
    .catch(errorUtils.handleError(res));
```

- A [Mongoose Error](https://github.com/Automattic/mongoose/blob/4.7.6/lib/error.js) triggered by validators defined in the schema. There are two types of mongoose errors that we support:

##### Required Field Error
The required field validator comes out of the box when you define your schema. The actual error code you want to throw for specific missing fields can be configured [here](https://github.com/IrisVR/iris-error-handler/blob/master/utils/mongodb/errorTypes/requiredField.js).

###### Example
```javascript
/**
 * userModel.js
 */
const User = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    required: true // built-in validator
  }
});

module.exports = mongoose.model('User', User);

/**
 * route.js
 */
const User = mongoose.model('User');
const createUser = (req, res) => {
  const userWithoutPassword = { username: 'cookies@gmail.gov' };
  User.create(userWithoutPassword)
    .then(u => res.send(u))
    .catch(errorUtils.handleError(res)); // Sends `205: PasswordMissing`
}
```

##### Custom Validation Error
You can set up custom validation on your schema using [`.validate(callback, [message])`](http://mongoosejs.com/docs/validation.html). If you do so, make sure to pass in the appropriate error code as the second argument.

###### Custom Validation Example
```javascript
/**
 * userModel.js
 */
const User = new mongoose.Schema({
  username: String
});

// Custom validator. Note that the second argument is an Iris error code.
User.path('username').validate(callback, '201');

function callback(value, respond) {
  return validator.isEmail(value)
    ? respond(true) : respond(false);
}

module.exports = mongoose.model('User', User);

/**
 * route.js
 */
const User = mongoose.model('User');
const createUser = (req, res) =>
  User.create({ username: 'INVALID_EMAIL_FORMAT' })
    .then(u => res.send(u))
    .catch(errorUtils.handleError(res)); // Sends `201: UsernameInvalid`
```

#### sendError(res, code)
Accepts an [Express response object](http://expressjs.com/es/api.html#res) and an Iris error code. The code is referenced against the [error table](#error-table) and the appropriate response payload is sent to the client. If no code is passed, the method will default to `-1: UnknownError`.

The client should always expect a successful `HTTP 200` status for errored responses, as more detailed information about the error will be provided in the response body. Refer to the error table for a breakdown of the payload.

_This method should not be called directly_ as it is invoked by the wrapper method [`handleError`](#handleerror-res--err-). However, it may be convenient to use in development.

###### Example
```javascript
const responder = (req, res) =>
  errorUtils.sendError(res, 101);
```

### MongoDB
#### validateObjectID(id)
Confirms whether a string is a valid Mongo [ObjectID](https://docs.mongodb.com/manual/reference/bson-types/#objectid); if so, the string is passed on to the next middleware.

This method should be placed _directly before_ making database queries that involve document ID(s).

###### Example
```javascript
const User = mongoose.model('User');
const getUser = (req, res) => {
  const id = req.user._id;
  errorUtils.validateObjectID(id)
    .then((id) => User.findById(id))
    .then(u => res.send(u))
    .catch(errorUtils.handleError(res));  // Sends `150: ObjectIDInvalid`
}
```

#### handleEntityNotFound(entity, [category])
Checks whether the relevant document exists in the database; if so, the document is passed on to the next middleware.

This method should be placed _directly after_ a database query.

An optional category argument can specify what type of document was(n't) found. If none is provided, the error will default to `160: NotFound`. A dictionary of supported category strings are available [here](https://github.com/IrisVR/iris-error-handler/blob/master/utils/mongodb/errorTypes/notFound.js).

###### Example
```javascript
const User = mongoose.model('User');
const getUser = (req, res) =>
  User.findById(req.user._id)
    .then(u => errorUtils.handleEntityNotFound(u, 'userId'))
    .then(u => res.send(u))
    .catch(errorUtils.handleError(res)); // Sends `204: UserIDNotFound`
```

#### validateOwner(user)(document)
Confirms whether a user has access to a document; if so, the document is passed on to the next middleware.

This is a lesser used method that only applies to documents with an `owner.username` field, such as Panos in the Library service.

###### Example
```javascript
const Document = mongoose.model('Document');
const updateDocument = (req, res) => {
  const user = req.user;
  const documentId = req.body._id;

  Document.findbyId(documentId)
    .then(errorUtils.validateOwner(user))
    .then(d => res.send(d))
    .catch(errorUtils.handleError(res)); // Sends `350: PermissionsError`
}
```

## Contribution
If you'd like to make an update the module, please make a pull request for imminent review.

### Error Codes
Prior to adding a new error code, ensure that a synonymous one doesn't already exist in the [error table](#error-table). If it's indeed a new one, either find a relevant category for it (e.g. User errors fall under 200-299) or create a new category and assign a new group of 100 integers.

If applicable, update the [requiredField](https://github.com/IrisVR/iris-error-handler/blob/master/utils/mongodb/errorTypes/requiredField.js) and/or [notFound](https://github.com/IrisVR/iris-error-handler/blob/master/utils/mongodb/errorTypes/notFound.js) dictionaries as necessary.

### Methods
New methods should be placed in `/utils`; those specific to individual microservices should be placed in `/utils/services`.

All new and/or updated methods should have corresponding unit and integration tests. PRs that lack proper testing will not be accepted.

## Unit Tests (TODO)