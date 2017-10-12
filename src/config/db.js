let config = null;

if (typeof global.database === 'object') {
  config = global.database;
} else {
  config = {
    client: 'mysql2',
    debug: false,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      supportBigNumbers: true,
      bigNumberStrings: true,
      multipleStatements: true,
      timezone: 'UTC',
      dateStrings: true,
    },
    pool: {
      min: process.env.DB_POOL_MIN,
      max: process.env.DB_POOL_MAX,
    },
  };
}

// main connections
const main = require('knex')(config);

module.exports = {
  knex: main,
  raw: main.raw, // alias to knex.raw
};
