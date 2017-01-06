# Iris Error Handler
Error handling middleware for IrisVR microservices.

Compatible with Node.js + Express apps only.

## Installation (TODO)
```
$ npm install iris-error-handler --save
```

## API
```
const errorHandler = require('iris-error-handler');
```

### Error Table
You may conjure the list of [internal Iris error codes](https://github.com/IrisVR/iris-error-handler/blob/master/errorTable.js) and their respective messages like this:
```
const errorTable = require('iris-error-handler').errorTable;
```

### Utilities & Usage
```
const errorUtils = require('iris-error-handler').utils;
```

#### Examples

## Contribution