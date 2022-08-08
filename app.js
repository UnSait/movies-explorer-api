require('dotenv').config();

const { DATA_MOVIES } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

const Cors = require('./middlewares/Cors');

const { PORT = 3000 } = process.env;

mongoose.connect(DATA_MOVIES);

const app = express();

app.use(bodyParser.json());

app.use(Cors);

app.use(helmet());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
