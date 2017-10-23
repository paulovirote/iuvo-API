const Logger = require('../helpers/Logger');
const OcorrenciaService = require('../services/OcorrenciaService');

class OcorrenciaController {
  static list(req, res) {
    OcorrenciaService.list()
      .then((ocorrencias) => {
        res.send(ocorrencias);
      })
      .catch((err) => {
        Logger.throw(res, '3272358416', err);
      });
  }

  static get(req, res) {
    OcorrenciaService.get(req.params)
      .then((ocorrencia) => {
        if (!ocorrencia) {
          res.send({ success: false, code: '7731668134', message: 'Ocorrencia não encontrada' });
          return;
        }
        res.send(ocorrencia);
      })
      .catch((err) => {
        Logger.throw(res, '6001059324', err);
      });
  }

  static post(req, res) {
    OcorrenciaService.post(req.body)
      .then((ids) => {
        res.send({ success: true, id: ids[0] });
      })
      .catch((err) => {
        Logger.throw(res, '2365958507', err);
      });
  }
}

module.exports = OcorrenciaController;
