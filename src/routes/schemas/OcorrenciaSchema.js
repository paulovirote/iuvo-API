const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class OcorrenciaSchema extends RouteValidator {
  static get get() {
    const schema = {};

    return this.validate(schema);
  }

  static get list() {
    const schema = {};

    return this.validate(schema);
  }

  static get post() {
    const schema = {
      body: Joi.object().keys({
        lat: Joi.string().required(),
        lon: Joi.string().required(),
        situacao: Joi.string().required(),
        momento: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get put() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.number().integer().required(),
      }),
      body: Joi.object().keys({
        name: Joi.string().required(),
      }),
    };

    return this.validate(schema);
  }

  static get delete() {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.number().integer().required(),
      }),
    };

    return this.validate(schema);
  }

}

module.exports = OcorrenciaSchema;
