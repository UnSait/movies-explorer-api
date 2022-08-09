require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

const Cors = require('./middlewares/Cors');

const { PORT = 3000, DATA_MOVIES = 'mongodb://localhost:27017/moviesdb' } = process.env;

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
