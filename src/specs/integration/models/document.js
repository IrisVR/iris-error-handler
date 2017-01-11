const mongoose = require('mongoose');

const Document = new mongoose.Schema({
  title: String,
  owner: {
    username: String
  }
});

module.exports = mongoose.model('Document', Document);
