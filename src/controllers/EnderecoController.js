const Logger = require('../helpers/Logger');
const EnderecoService = require('../services/EnderecoService');

class EnderecoController {
  static async get(req, res) {
    const position = {
      lat: req.query.lat,
      lng: req.query.lng,
    };

    try {
      const endereco = await EnderecoService.getFromCordinates(position);      

      res.send({
        endereco,
      });
    } catch (error) {
      Logger.throw(res, '6001059324', error);
    }
  }
}

module.exports = EnderecoController;
