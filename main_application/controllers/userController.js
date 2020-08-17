const {errorHandler} = require("../utils/errors");
const User = require('../models/User');

exports.userGet = async (req, res, next) => {
  try {
    const doc = req.body;
    const user = await User.findOne({ _id: doc._id });
    res.status(200).json({
      success: true,
      user
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
};
