var router = require('express').Router();
const userController = require('../Controllers/userController');

//router.post('/create', userController.userCreate);
router.post('/get', userController.userGet);

module.exports = router;