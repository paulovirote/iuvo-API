const Logger = require('../helpers/Logger');
const SmsService = require('../services/SmsService');
const EnderecoService = require('../services/EnderecoService');
const OcorrenciaService = require('../services/OcorrenciaService');

class SmsController {

  static async receiveSms(req, res) {
    const sms = req.query.Body;
    const from = req.query.From;
    const keyword = 'Iuvo';

    if (sms.indexOf(keyword) >= 0) {
      const endereco = sms.substring(keyword.length, sms.length);

      const address = await EnderecoService.getLocationFromAddress(endereco);

      let mensagem;
      try {
        await OcorrenciaService.post({
          lat: address.geometry.location.lat,
          lng: address.geometry.location.lng,
          situacao: 'Outro',
          momento: 'Durante',
        });

        mensagem = `Recebemos sua solicitação. Assim que possível estaremos no endereço informado! ${address.formatted_address}`;
      } catch (error) {
        mensagem = 'Ocorreu um erro ao solicitar a sua ajuda, se fudeu';
      }

      try {
        await SmsService.sendSms({
          body: mensagem,
          to: from,
          from: '+15103690679',
        });
      } catch (error) {
        Logger.throw(res, '1231414123452', error);
      }

      res.end();
    }
  }
}

module.exports = SmsController;
