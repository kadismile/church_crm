var router = require('express').Router();
const AuthController = require('../Controllers/AuthController');


router.post('/login', AuthController.authLogin);

module.exports = router;