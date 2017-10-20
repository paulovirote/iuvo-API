const request = require('request');

class TempoService {
  static request(url, qs) {
    return new Promise((resolve, reject) => {
      request.get({
        url,
        json: true,
        qs: Object.assign({
          appid: 'cbea6dc35da0d2c739aceeaefe5e9b98',
          units: 'metric',
          lang: 'pt',
        }, qs),
      }, (error, response, body) => {
        if (error) {
          reject(error);
        }

        resolve(body);
      });
    });
  }

  static async atual(cidade) {
    try {
      return await this.request('http://api.openweathermap.org/data/2.5/weather', {
        q: cidade,
      });
    } catch (error) {
      throw error;
    }
  }

  static async hoje(cidade) {
    try {
      return await this.request('http://api.openweathermap.org/data/2.5/forecast', {
        q: cidade,
        cnt: 8,
      });
    } catch (error) {
      throw error;
    }
  }

  static obterPrevisoesInfos(previsoes) {
    const obj = {
      maximas: [],
      minimas: [],
      criticos: [],
    };

    previsoes.map((o) => {
      obj.maximas.push(o.main.temp_max);
      obj.minimas.push(o.main.temp_min);
      obj.criticos.push(o.weather[0].main);
    });

    return obj;
  }  

  static obterCritica(criticos) {
    const nivelCritico = {
      Clear: 1,
      Clouds: 2,
      Drizzle: 3,
      Rain: 4,
      Thunderstorm: 5,
      Snow: 6,
      Extreme: 7,
    };

    let maisCritico = 0;
    let maisCriticoNome;

    criticos.forEach(function(element) {
      if(nivelCritico[element] > maisCritico){
        maisCritico = nivelCritico[element];
        maisCriticoNome = element;
      }
    });

    return maisCriticoNome;
  }
}

module.exports = TempoService;
