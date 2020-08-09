var router = require('express').Router();
const WebHookController = require('../Controllers/WebHookController');


router.post('/test', WebHookController.webhooktest);

module.exports = router;