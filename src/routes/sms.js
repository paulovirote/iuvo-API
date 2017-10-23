const express = require('express');
const SmsController = require('../controllers/SmsController');
const SmsSchema = require('../routes/schemas/SmsSchema');

const router = express.Router({ mergeParams: true });

/* GET /sms */
router.get('/', SmsSchema.list, SmsController.receiveSms);

module.exports = router;
