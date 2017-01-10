/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  }
});

User.path('username').validate(isEmail, '201');

function isEmail(value) {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(value);
}

module.exports = mongoose.model('User', User);
