var router = require('express').Router();
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const permission =  require("../config/permissions");

router.post('/church/register', authController.registerChurch);

router.post('/user/register', protect, authorize(permission.USER_PERMISSION), authController.registerUser);

router.post('/user/update',protect, authorize(permission.USER_PERMISSION), authController.updateUser);

router.post('/forgetpassword', authController.forgotPassword);

router.put('/resetpassword/:resettoken', authController.resetPassword);

router.post('/login', authController.authLogin);

module.exports = router;