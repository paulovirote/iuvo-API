const Logger = require('../helpers/Logger');

class EverySecond {

  static runner() {
    Logger.info(__('cron.everySecond.tick'));
  }
}

module.exports = EverySecond;
