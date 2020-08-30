const {errorHandler} = require("../utils/errors");
const User = require('../models/User');
const Category = require('../models/Category');

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

exports.createCategory = async (req, res) => {
  try {
    const doc = req.body;
    var validate = new Category(doc);
    var error = validate.validateSync();
    if (error) {
      res.status(406).json({
        status: 'failed',
        errors: error.errors
      });
    }
    const categoryData = await Category.create(doc);
    res.status(201).json({
      success: true,
      data: categoryData
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
  
};

exports.getCategory = async (req, res) => {
  try {
    const {church_group} = req.user;
    const churchGroup = await Category.find({church_group}).select('name -_id');
    res.status(201).json({
      success: true,
      data: churchGroup
    })
  } catch (e) {
    console.log(`${e}`.red);
    errorHandler(e, res);
  }
  
};