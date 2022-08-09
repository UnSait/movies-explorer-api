const Movie = require('../models/movie');
const NotFound = require('../utils/Errors/NotFound');
const Forbidden = require('../utils/Errors/Forbidden');
const BadRequest = require('../utils/Errors/BadRequest');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFound('Не найдено'));
      } if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        return next(new Forbidden('Невозможно удалить фильм'));
      }
      return Movie.findByIdAndRemove(movieId).then(() => {
        res.send({ message: 'Фильм удален' });
      });
    })
    .catch((err) => {
      next(err);
    });
};
