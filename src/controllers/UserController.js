const Logger = require('../helpers/Logger');
const UserService = require('../services/UserService');

class UserController {

  static list(req, res) {
    UserService.list()
      .then((rows) => {
        res.send({ success: true, data: rows });
      })
      .catch((err) => {
        Logger.throw(res, '3272358416', err);
      });
  }

  static get(req, res) {
    UserService.get(req.params)
      .then((user) => {
        if (!user) {
          res.send({ success: false, code: '7731668134', message: req.__('api.user.notFound') });
          return;
        }
        res.send({ success: true, data: user });
      })
      .catch((err) => {
        Logger.throw(res, '6001059324', err);
      });
  }

  static post(req, res) {
    UserService.post(req.body)
      .then((ids) => {
        res.send({ success: true, id: ids[0] });
      })
      .catch((err) => {
        Logger.throw(res, '2365958507', err);
      });
  }

  static put(req, res) {
    const data = {
      userId: req.params.userId,
      name: req.body.name,
    };

    UserService.put(data)
      .then((user) => {
        if (!user) {
          res.send({ success: false, code: '7502749763', message: req.__('api.user.notFound') });
          return;
        }
        res.send({ success: true });
      })
      .catch((err) => {
        Logger.throw(res, '5768905470', err);
      });
  }

  static delete(req, res) {
    UserService.delete(req.params)
      .then((user) => {
        if (!user) {
          res.send({ success: false, code: '9517673561', message: req.__('api.user.notFound') });
          return;
        }
        res.send({ success: true });
      })
      .catch((err) => {
        Logger.throw(res, '5768905476', err);
      });
  }

}

module.exports = UserController;
