const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {UserBeforeCreate} = require('./hooks/user_hooks')
const categorySchema = require('../Models/Category');
const {prepareValidPhoneNumber} = require("../utils/helpers");
const addressSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate();
    }
  },
  country: {
    type: String
  },
  address: {
    type: String,
  },
  countryCode: {
    type: String,
  }
});


const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate();
    }
  },
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  address: {
    type : [addressSchema]
  },
  password: {
    type: String,
    min: [6, 'password too short'],
  },
  role: {
    type : Array ,
    default : [],
    optional: true,
  },
  category: {
    type : [categorySchema],
  },
  history: {
    type: Array,
    optional: true,
  },
  superAdmin: {
    type: Boolean,
    default: function() {
      return false;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

//this is the hook after insert
UserSchema.post("save", async function(doc) {

});

UserSchema.pre("save", async function() {
  await UserBeforeCreate(this)
});
module.exports = UserSchema;