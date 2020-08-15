var router = require('express').Router();
const authController = require('../Controllers/authController');

router.post('/church/register', authController.registerChurch);
router.post('/user/register', authController.registerUser);
router.post('/user/update', authController.updateUser);
router.post('/login', authController.authLogin);

module.exports = router;