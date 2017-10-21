const request = require('request');

class EnderecoService {
  static request(path, qs) {
    return new Promise((resolve, reject) => {
      request.get({
        url: `https://maps.googleapis.com/maps/api${path}`,
        json: true,
        qs: Object.assign({
          key: 'AIzaSyABTqiSDriN8azabxuC_tSClFWVT_hXCT0',
        }, qs),
      }, (error, response, body) => {
        if (error) {
          reject(error);
        }

        resolve(body);
      });
    });
  }

  static async getFromCordinates(position) {
    try {
      const address = await this.request('/geocode/json', {
        latlng: `${position.lat},${position.lng}`,
      });

      return address.results[0].formatted_address;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EnderecoService;
