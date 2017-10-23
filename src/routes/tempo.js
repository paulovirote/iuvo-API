const express = require('express');
const TempoController = require('../controllers/TempoController');
const TempoSchema = require('../routes/schemas/TempoSchema');

const router = express.Router({ mergeParams: true });

/* GET /tempo */
router.get('/', TempoSchema.get, TempoController.get);

module.exports = router;
