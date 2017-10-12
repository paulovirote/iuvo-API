const winston = require('winston');
const expressWinston = require('express-winston');
const WFirehose = require('winston-firehose');
const request = require('request');
const debug = require('request-debug');
const moment = require('moment');
const Logger = require('../helpers/Logger');

const instances = {
  init: false,
  expressRequest: false,
  expressError: false,
};

class LoggerConfig {

  static init() {
    if (instances.init) {
      throw Error('Logger: init already executed');
    }

    instances.init = true;
    winston.configure({
      exitOnError: false,
      levels: this.getLevels(),
      colors: this.getColors(),
      transports: this.getTransports(),
    });

    debug(request, this.requestDebugFormatter);
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
  }

  static getTransports() {
    const transports = [];

    /* https://github.com/pkallos/winston-firehose */
    if (process.env.FIREHOSE === 'true') {
      transports.push(new WFirehose({
        streamName: process.env.FIREHOSE_STREAM_NAME,
        firehoseOptions: {
          region: process.env.FIREHOSE_REGION,
          accessKeyId: process.env.FIREHOSE_ACCESS_KEY_ID,
          secretAccessKey: process.env.FIREHOSE_SECRET_ACCESS_KEY,
        },
      }));
    }

    if (process.env.CONSOLE === 'true') {
      transports.push(new winston.transports.Console({
        timestamp: () => {
          return moment.utc().format('YYYY-MM-DD HH:mm:ss');
        },
        json: false,
        colorize: true,
      }));
    }

    return transports;
  }

  static getLevels() {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7, // 'debug' entries were not displayed
    };
  }

  static getColors() {
    return {
      emerg: 'bgRed',
      alert: 'bgMagenta',
      crit: 'bgRed',
      error: 'red',
      warning: 'yellow',
      notice: 'bgBlue',
      info: 'green',
      debug: 'white',
    };
  }

  static requestDebugFormatter(type, data) {
    let message = null;
    let status = 0;

    if (type === 'request') {
      message = {
        id: data.debugId,
        type,
        date: moment.utc().format('YYYY-MM-DD hh:mm:ss'),
        url: data.uri,
        method: data.method,
        message: data.body,
      };
    } else if (type === 'response') {
      status = data.statusCode;
      message = {
        id: data.debugId,
        type,
        date: moment.utc().format('YYYY-MM-DD hh:mm:ss'),
        status,
        message: data.body,
      };
    }

    if (message) {
      switch (LoggerConfig.getLevelByStatusCode(status)) {
        case 'warning': Logger.warning(message); break;
        case 'error': Logger.error(message); break;
        case 'crit': Logger.crit(message); break;
        default: Logger.info(message);
      }
    } else {
      Logger.warning(type, data);
    }
  }

  static expressRequest(app) {
    if (instances.expressRequest) {
      throw Error('Logger: expressRequest already executed');
    }

    instances.expressRequest = true;
    app.use(expressWinston.logger(this.getLoggerOptions()));
  }

  static expressError(app) {
    if (instances.expressError) {
      throw Error('Logger: expressError already executed');
    }

    instances.expressError = true;
    app.use(expressWinston.errorLogger(this.getLoggerOptions()));

    app.use((err, req, res, next) => { // eslint-disable-line
      res.status(err.status || 500);
      res.send({ code: 0, message: 'Falha interna do servidor' });
    });
  }

  static getLevelByStatusCode(code) {
    let level = 'info';
    if (code >= 400) { level = 'warning'; }
    if (code >= 500) { level = 'error'; }
    if (code === 401 || code === 403) { level = 'crit'; }
    return level;
  }

  /* https://github.com/bithavoc/express-winston */
  static getLoggerOptions() {
    const requestFilterBlacklist = ['headers', 'httpVersion', 'originalUrl'];
    const responseFilterBlacklist = [];
    const bodyBlacklist = [];
    const ignoredRoutes = ['/', '/status', '/favicon.ico'];

    return {
      winstonInstance: winston,
      meta: true,
      msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}',
      expressFormat: false,
      colorStatus: true,
      ignoredRoutes,
      requestFilter: (req, propName) => {
        if (requestFilterBlacklist.indexOf(propName) >= 0) {
          return undefined;
        }
        return req[propName];
      },
      responseFilter: (res, propName) => {
        if (responseFilterBlacklist.indexOf(propName) >= 0) {
          return undefined;
        }

        if (propName === 'body' && res[propName] && bodyBlacklist.length > 0) {
          for (let i in res[propName]) {
            if (bodyBlacklist.indexOf(i) >= 0) {
              res[propName][i] = 'protected';
            }
          }
        }

        return res[propName];
      },
      dynamicMeta: (req) => {
        return {
          session: req.session ? req.session.id : null,
          user: req.session ? req.session.user.id : null,
        };
      },
      skip: (req) => {
        if (req.method.toUpperCase() === 'GET') {
          return true;
        }

        return false;
      },
    };
  }
}

module.exports = LoggerConfig;
