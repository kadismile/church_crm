const {errorHandler} = require("../utils/errors");
const User = require('../models/User');

exports.userGet = async (req, res) => {
  try {
    //delete req.user.password;
    res.status(200).json({
      success: true,
      user: req.user
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};
