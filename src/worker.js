/* .env lib */
require('dotenv').config();

/* Dependencies */
/* https://github.com/kelektiv/node-cron */
const CronJob = require('cron').CronJob;
require('./config/i18n');

/* Logger */
const LoggerConfig = require('./config/LoggerConfig');
const Logger = require('./helpers/Logger');

LoggerConfig.init();

/* Crons */
const EverySecond = require('./crons/EverySecond.js');

/* Services */
const services = [];

// You will see this message every second
services.push(new CronJob('* * * * * *', EverySecond.runner, null, false));

/* Start services */
services.map((service) => {
  return service.start();
});

Logger.info(`Worker started ${services.length} services`);
