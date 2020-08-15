const {errorHandler} = require("../utils/errors");
const User = require('../Models/User');
const Church = require('../Models/Church');
const {prepareValidPhoneNumber} = require("../utils/helpers");


exports.registerChurch = async (req, res) => {
  try {
    const doc = req.body;
    var validate = new Church(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }
    doc.phoneNumber = prepareValidPhoneNumber(doc.phoneNumber, doc.address.countryCode, res);
    const church = await Church.create(doc);
    res.status(201).json({
      success: true,
      data: church
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
  
};

exports.registerUser = async (req, res) => {
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
    sendTokenResponse(user, 201, res)
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};

exports.updateUser = async (req, res) => {
  const doc = req.body;
  
  const user = await User.findByIdAndUpdate(doc.userId, doc, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: user
  });
};

exports.authLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403).json({
      success: false,
      data: "Please provide an email and password"
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      res.status(401).json({
        success: false,
        data: "Invalid credentials"
      });
    }
    
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      res.status(401).json({
        success: false,
        data: "Invalid credentials"
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
        token,
        user
      });
};