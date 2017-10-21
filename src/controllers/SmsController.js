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

      const location = await EnderecoService.getLocationFromAddress(endereco);

      let mensagem;
      try {
        await OcorrenciaService.post({
          lat: location.lat,
          lng: location.lng,
          situacao: 'Outro',
          momento: 'Durante',
        });

        mensagem = 'Vamos te salvar, guenta ai!';
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
