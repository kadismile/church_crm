var router = require('express').Router();
const ChurchController = require('../Controllers/ChurchController');


router.post('/create', ChurchController.churchCreate);

module.exports = router;