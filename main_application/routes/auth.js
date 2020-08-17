var router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/church/register', authController.registerChurch);
router.post('/user/register', authController.registerUser);
router.post('/user/update', authController.updateUser);
router.post('/forgetpassword', authController.forgotPassword);
router.put('/resetpassword/:resettoken', authController.resetPassword);

router.post('/login', authController.authLogin);

module.exports = router;