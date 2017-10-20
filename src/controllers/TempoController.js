const Logger = require('../helpers/Logger');
const TempoService = require('../services/TempoService');

class TempoController {
  static async get(req, res) {
    const { cidade } = req.query;

    try {
      const [tempoAtual, tempoHoje] = await Promise.all([
        TempoService.atual(cidade),
        TempoService.hoje(cidade),
      ]);

      const previsoesInfo = TempoService.obterPrevisoesInfos(tempoHoje.list);

      const temperatura = {};
      temperatura.atual = Math.floor((tempoAtual.main.temp_min + tempoAtual.main.temp_max) / 2);
      temperatura.minima = Math.floor(Math.min(...previsoesInfo.minimas));
      temperatura.maxima = Math.floor(Math.max(...previsoesInfo.maximas));

      const previsao = {};
      previsao.atual = tempoAtual.weather[0].main;
      previsao.critica = TempoService.obterCritica(previsoesInfo.criticos);

      const response = {
        temperatura,
        previsao,
      };

      res.send(response);
    } catch (error) {
      Logger.throw(res, '6001059324', error);
    }
  }
}

module.exports = TempoController;
