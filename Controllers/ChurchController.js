const {errorHandler} = require("../utils/errors");
const {prepareValidPhoneNumber} = require("../utils/helpers");
const Church = require('../Models/Church');
const user = require('../methods/users');

exports.churchCreate = async (req, res, next) => {
  
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