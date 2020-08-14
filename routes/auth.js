var router = require('express').Router();
const AuthController = require('../Controllers/AuthController');


router.post('/login', AuthController.authLogin);
router.get('/user', AuthController.getCurrentUser);

module.exports = router;