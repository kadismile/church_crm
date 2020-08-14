const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {ChurchBeforeCreate} = require('./hooks/church_hooks');
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


const churchAccount = mongoose.Schema({
  currentBalance: {
    type: Number,
    decimal: true,
    default: function() {
      return 0
    }
  },
},{versionKey: false});

const ChurchSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
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
    select: false, //dont show the password
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
      return true;
    }
  },
  account: {
    type: {churchAccount},
  },
  group: {
    type: String,
    min: [6, 'group too short'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},{versionKey: false});

//this is the hook after insert
ChurchSchema.post("save", async function(doc) {

});

ChurchSchema.pre("save", async function() {
  await ChurchBeforeCreate(this)
});
module.exports = mongoose.model('Church', ChurchSchema);