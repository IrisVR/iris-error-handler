const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = mongoose.model('User');
const Document = mongoose.model('Document');
const utils = require('../../../../utils');

const express = require('express');
const router = new express.Router();

/**                                                **
 * Generic routes to demonstrate MongoDB validation *
 **                                                **/

router.get('/', (req, res) => {
  return Promise.reject('unknown server error')
    .catch(utils.handleError(res));
});

router.get('/document/:id', (req, res) => {
  return utils.validateObjectID(req.params.id)
    .then(id => Document.findById(id))
    .then(utils.handleEntityNotFound)
    .then(utils.validateOwner(req.query.user))
    .then(u => res.send(u))
    .catch(utils.handleError(res));
});

router.post('/user/', (req, res) => {
  return User.create(req.query.user)
    .then(u => res.send(u))
    .catch(utils.handleError(res));
});

module.exports = router;
