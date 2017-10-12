const UserModel = require('../models/UserModel');
const Convert = require('../helpers/Conversion');

class UserService {

  static list() {
    return UserModel.list()
    .then((dbList) => {
      if (dbList.length === 0) {
        return dbList;
      }

      const result = dbList.map(user => ({
        id: user.id,
        name: user.name,
        status: user.status,
        createdAt: Convert.toUnixEpoch(user.createdAt),
        updatedAt: Convert.toUnixEpoch(user.updatedAt),
        deletedAt: Convert.toUnixEpoch(user.deletedAt),
      }));
      return result;
    });
  }

  static get(data) {
    return UserModel.get(data)
      .then(([user]) => {
        if (user === undefined) {
          return null;
        }

        const result = {
          id: user.id,
          name: user.name,
          status: user.status,
          createdAt: Convert.toUnixEpoch(user.createdAt),
          updatedAt: Convert.toUnixEpoch(user.updatedAt),
          deletedAt: Convert.toUnixEpoch(user.deletedAt),
        };
        return result;
      });
  }

  static post(data) {
    return UserModel.post(data);
  }

  static put(data) {
    return UserModel.put(data);
  }

  static delete(data) {
    return UserModel.delete(data);
  }
}

module.exports = UserService;
