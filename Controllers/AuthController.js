const {errorHandler} = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../Models/User');


exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403).json({
      success: false,
      data: "Kindly Provide Email and Password"
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      res.status(401).json({
        success: false,
        data: "Unauthorized"
      });
    }
    
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      res.status(401).json({
        success: false,
        data: "Unauthorized"
      });
    } else {
  
      sendTokenResponse(user, 200, res)
    }
  } catch (e) {
    return errorHandler(e, res);
  }
};

const sendTokenResponse = async(user, statusCode, res) => {
  // Create token
  const token = await user.getSignedJwtToken();
  
  const options = {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  
  res
      .status(statusCode)
      .json({
        success: true,
        token
      });
};