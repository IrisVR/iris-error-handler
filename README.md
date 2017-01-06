# Iris Error Handler
Error handling middleware for IrisVR microservices.

Compatible with Node.js + Express apps only. Currently supports MongoDB validation errors.

## Installation (TODO)
```
$ npm install iris-error-handler --save
```

## API
```javascript
const errorHandler = require('iris-error-handler');
```

### Error Table
You may conjure the list of [internal Iris error codes](https://github.com/IrisVR/iris-error-handler/blob/master/errorTable.js) and their respective messages like this:

```javascript
const errorTable = require('iris-error-handler').errorTable;
```

The error code acts as the key, while the value contains the meta payload to be returned to the client. The meta object contains the following fields:
- `code`: An integer value that categorizes the type of response according to our internal status code library. _This number is unrelated to a standard HTTP status code_.
- `error_type`: A brief description of the error.
- `error_message`: A string that describes error in full detail.

#### Organization
- **-1**: Unknown error. This is the default error returned by the middleware if no error code is specified.
- **1 - 99**: Third-party errors (!!!!!!TODO!!!!!!!)
- **100 - 149**: Request header errors
- **150 - 199**: MongoDB errors
- **200 - 299**: User errors
- **300 - 399**: Library errors
- **400 - 499**: Team errors (billing)
- **500 - 599**: Billing errors
- **600 - 699**: Notification errors

Each microservice is allocated

#### Example
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

### Utilities & Usage
```javascript
const errorUtils = require('iris-error-handler').utils;
```

#### handleError(res)(err)
Currying function that accepts an [Express response object](http://expressjs.com/es/api.html#res) and an error argument. This method internally triggers [`sendError`](#sendError) for ultimately sending the response back to the client.

The error passed in must be one of two types:
- A [Javascript Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) in the form of `Error(X)`, where `X` denotes an Iris error code.
- A [Mongoose Error](https://github.com/Automattic/mongoose/blob/4.7.6/lib/error.js) triggered by validators defined in the schema. 

For mongoose errors, the handler will catch built-in errors _and/or_ custom validation methods. If you're using the latter, make sure you pass in the appropriate error code as an argument in the validation method. This can be seen in the example below.

##### Example With Javascript Error
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
    .catch(handleError(res));
```

##### Example With Mongoose Error
```javascript
/**
 * userModel.js
 */
const User = new mongoose.Schema({
  username: {
    type: String,
    required: true // built-in validator
  },
  password: {
    type: String,
    required: true // built-in validator
  }
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
const createUser = (req, res) => {
  const userWithoutPassword = { username: 'cookies@gmail.gov' }
  User.create(userWithoutPassword)
    .then(u => res.send(u))
    .catch(handleError(res));
}
```

### sendError(res, code)
Accepts an [Express response object](http://expressjs.com/es/api.html#res) and an Iris error code.




### Examples

## Contribution