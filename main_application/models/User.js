const mongoose = require('mongoose');
const randomstring = require("randomstring");
const {UserBeforeSave, UserAfterUpdate} = require('./hooks/user_hooks');
const categorySchema = require('./Category');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const addressSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function() {
      return randomstring.generate(18);
    }
  },
  country: {
    type: String,
    required: [true, 'country is missing']
  },
  fullAddress: {
    type: String,
    required: [true, 'full address is missing']
  },
  countryCode: {
    type: String,
    required: [true, 'country code is missing']
  },
  longitude: {
    type: Number,
    required: [true, 'longitude missing']
  },
  latitude: {
    type: String,
    required: [true, 'latitude missing']
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
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Please Add Gender']
  },
  dob: {
    type: Date,
    required: [true, 'Please Add Date of birth']
  },
  maritalStatus: {
    type: String,
    enum: ['married', 'single'],
    required: [true, 'Please Add marital status']
  },
  address: {
    type : [addressSchema],
    required: [true, 'Please add an address']
  },
  password: {
    type: String,
    select: false, //dont show the password
    min: [6, 'password too short'],
  },
  resetPasswordToken: {
    type: String,
    optional: true,
  },
  resetPasswordExpire: {
    type: Date
  },
  roles: {
    type : Array ,
    default : [],
    optional: true,
  },
  category: {
    type : Array ,
    default : [],
    optional: true,
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
  church_group: {
    type: String,
    required: [true, 'user Must be under a group']
  },
},{versionKey: false});

//this is the hook after insert
UserSchema.pre("findOneAndUpdate", async function(doc, next) {
  await UserAfterUpdate(this, next)
});

UserSchema.pre("save", async function() {
  await UserBeforeSave(this)
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ _id: this._id, roles: this.roles, church_group:this.church_group }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);