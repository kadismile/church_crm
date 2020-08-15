var router = require('express').Router();
const webHookController = require('../Controllers/webHookController');


router.post('/test', webHookController.webhooktest);

module.exports = router;