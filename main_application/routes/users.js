var router = require('express').Router();
const userController = require('../controllers/userController');

//router.post('/create', userController.userCreate);
router.post('/get', userController.userGet);

module.exports = router;