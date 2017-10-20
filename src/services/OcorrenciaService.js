const OcorrenciaModel = require('../models/OcorrenciaModel');
const Convert = require('../helpers/Conversion');

class OcorrenciaService {

  static list() {
    return OcorrenciaModel.list()
      .then((dbList) => {
        if (dbList.length === 0) {
          return dbList;
        }

        // const result = dbList.map(ocorrencia => ({
        //   id: user.id,
        //   name: user.name,
        //   status: user.status,
        //   createdAt: Convert.toUnixEpoch(user.createdAt),
        //   updatedAt: Convert.toUnixEpoch(user.updatedAt),
        //   deletedAt: Convert.toUnixEpoch(user.deletedAt),
        // }));
        // return result;
        return dbList;
      });
  }

  static async get(data) {
    return OcorrenciaModel.get(data)
      .then(([ocorrencia]) => {
        if (ocorrencia === undefined) {
          return null;
        }

        return ocorrencia;
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
