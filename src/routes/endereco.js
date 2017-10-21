const express = require('express');
const EnderecoController = require('../controllers/EnderecoController');
const EnderecoSchema = require('../routes/schemas/EnderecoSchema');

const router = express.Router({ mergeParams: true });

/* GET /endereco */
router.get('/', EnderecoSchema.get, EnderecoController.get);

module.exports = router;
