const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {UserBeforeCreate} = require('./hooks/user_hooks');
const categorySchema = require('../Models/Category');

const addressSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
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
},{versionKey: false});


const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  name: {
    type: String,
    required: [true, 'Please Add a name']
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  address: {
    type : [addressSchema],
    required: [true, 'Please add an address']
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
    required: [true, 'Please add a category']
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
  },
  group: {
    type: String,
    required: [true, 'user Must be under a group']
  },
},{versionKey: false});

//this is the hook after insert
UserSchema.post("save", async function(doc) {

});

UserSchema.pre("save", async function() {
  await UserBeforeCreate(this)
});
module.exports = mongoose.model('User', UserSchema);