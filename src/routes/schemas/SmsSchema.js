const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class SmsSchema extends RouteValidator {

  static get list() {
    const schema = {};

    return this.validate(schema);
  }

}

module.exports = SmsSchema;
