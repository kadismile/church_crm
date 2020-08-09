const mongoose = require('mongoose');
var randomstring = require("randomstring");

const categorySchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},{versionKey: false});

module.exports = categorySchema;
//module.exports = mongoose.model('Category', categorySchema);