require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  INTERNAL_SERVER_ERROR,
} = require('./utils/constants');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./utils/Errors/NotFound');
const Cors = require('./middlewares/Cors');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb');

const app = express();

app.use(bodyParser.json());

app.use(Cors);

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movie'));

app.use((req, res, next) => {
  next(new NotFound('Страницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: err });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
