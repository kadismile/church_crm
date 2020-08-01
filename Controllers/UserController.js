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

  exports.user_login = async(req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        res.status(409).json({status: 'failed', message: info.message});
      } else {
        try{
          const token = jwt.sign({ id: user.username }, jwtSecret.secret, { expiresIn: '720m' });
          res.status(200).send({
            auth: true,
            token: token,
            user,
            message: 'user found & logged in',
          });
        }catch (e) {
          console.log(e)
        }
      }
    })(req, res, next);
  };

exports.find = async(req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      res.status(401).json({status: 'Error', message: "UnAuthorized"});
    } else {
      res.status(200).send({
        auth: true,
        user
      });
    }
  })(req, res, next);
};

exports.logout = async(req, res, next) => {
  req.logout();
  res.status(200).send({
    message: 'Logged Out Successfully',
  });
};
