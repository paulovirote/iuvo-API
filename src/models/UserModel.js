const { utc } = require('moment');
const { knex } = require('../config/db');
const userType = require('../types/user');

class UserModel {

  static list() {
    return knex
    .from('user')
    .whereNot('user.status', userType.DELETED);
  }

  static get(data) {
    return knex
    .from('user')
    .where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED);
  }

  static post(data) {
    return knex
    .from('user')
    .insert(data);
  }

  static put(data) {
    const query = knex
    .from('user');

    if (data.name) {
      query.update('name', data.name);
    }

    query.where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED);

    return query;
  }

  static delete(data) {
    return knex
    .from('user')
    .where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED)
    .update({
      status: userType.DELETED,
      deletedAt: utc().format('YYYY-MM-DD HH:mm:ss'),
    });
  }

}

module.exports = UserModel;
