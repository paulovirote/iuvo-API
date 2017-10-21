/* .env lib */
require('dotenv').config();

/* Dependencies */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const i18n = require('./config/i18n');

/* Routes */
const userRoutes = require('./routes/user');
const tempoRoutes = require('./routes/tempo');
const ocorrenciaRoutes = require('./routes/ocorrencia');
const enderecoRoutes = require('./routes/endereco');
const smsRoutes = require('./routes/sms');

/* Express initialization */
const app = express();

/* Logger */
const LoggerConfig = require('./config/LoggerConfig');
const Logger = require('./helpers/Logger');

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(i18n.init);
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Log express request and response */
LoggerConfig.expressRequest(app);

/* Status endpoint */
app.get('/', (req, res) => {
  res.send('ok');
});

/* Instatiate routes */
app.use('/user', userRoutes);
app.use('/tempo', tempoRoutes);
app.use('/ocorrencia', ocorrenciaRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/sms', smsRoutes);

/* Log errors */
LoggerConfig.expressError(app);

app.all('*', (req, res) => {
  res.status(404).send({ success: false, code: '404' });
});

/* Startup message */
app.listen(process.env.PORT, () => {
  /* Configure Log */
  LoggerConfig.init();
  Logger.info(`Server started on port ${process.env.PORT}`);
});
