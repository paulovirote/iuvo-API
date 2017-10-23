const OcorrenciaModel = require('../models/OcorrenciaModel');

class OcorrenciaService {

  static list() {
    return OcorrenciaModel.list()
      .then((dbList) => {
        if (dbList.length === 0) {
          return dbList;
        }

        const result = dbList.map(ocorrencia => ({
          id: ocorrencia.id,
          position: {
            lat: ocorrencia.lat,
            lng: ocorrencia.lng,
          },
          situacao: ocorrencia.situacao,
          momento: ocorrencia.momento,
        }));
        return result;
      });
  }

  static async get(data) {
    return OcorrenciaModel.get(data)
      .then(([ocorrencia]) => {
        if (ocorrencia === undefined) {
          return null;
        }

        return {
          id: ocorrencia.id,
          position: {
            lat: ocorrencia.lat,
            lng: ocorrencia.lng,
          },
          situacao: ocorrencia.situacao,
          momento: ocorrencia.momento,
        };
      });
  }

  static post(data) {
    return OcorrenciaModel.post(data);
  }

  // static put(data) {
  //   return UserModel.put(data);
  // }

  // static delete(data) {
  //   return UserModel.delete(data);
  // }
}

module.exports = OcorrenciaService;
