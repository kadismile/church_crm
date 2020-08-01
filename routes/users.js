var router = require('express').Router();
const UserController = require('../Controllers/UserController');

router.post('/create', UserController.userCreate);

module.exports = router;