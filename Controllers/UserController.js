const mongoose = require('mongoose');
const {errorHandler} = require("../utils/errors");
const {prepareValidPhoneNumber} = require("../utils/helpers");
const jwtSecret = require('../config/jwtConfig');
const UserSchema = require('../Models/User');
const User = mongoose.model('Users', UserSchema);
const user = require('../methods/users');
var jwt = require('jsonwebtoken');

exports.userCreate = async (req, res, next) => {
  
  try {
    const doc = req.body;
    var validate = new User(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }
    doc.phoneNumber = prepareValidPhoneNumber(doc.phoneNumber, doc.address.countryCode, res);
    const user = await User.create(doc);
    res.status(201).json({
      success: true,
      user
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};
