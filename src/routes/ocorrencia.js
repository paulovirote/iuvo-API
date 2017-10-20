const express = require('express');
const OcorrenciaController = require('../controllers/OcorrenciaController');
const OcorrenciaSchema = require('../routes/schemas/OcorrenciaSchema');

const router = express.Router({ mergeParams: true });

/* POST /ocorrencia */
router.post('/', OcorrenciaSchema.post, OcorrenciaController.post);

/* GET /ocorrencia */
router.get('/', OcorrenciaSchema.list, OcorrenciaController.list);

/* GET /ocorrencia/:ocorrenciaId */
router.get('/:ocorrenciaId', OcorrenciaSchema.get, OcorrenciaController.get);

module.exports = router;
