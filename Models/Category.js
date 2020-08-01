const mongoose = require('mongoose');
var randomstring = require("randomstring");

const categorySchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate();
    }
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = categorySchema;
//module.exports = mongoose.model('Category', categorySchema);