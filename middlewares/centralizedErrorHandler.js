const {
  INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  next();
});
