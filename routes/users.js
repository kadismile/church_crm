var router = require('express').Router();
const UserController = require('../Controllers/UserController');

router.post('/create', UserController.userCreate);
router.post('/get', UserController.userGet);

module.exports = router;