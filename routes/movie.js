const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { LINK } = require('../utils/constants');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK),
    trailerLink: Joi.string().required().pattern(LINK),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(LINK),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24),
  }),
}), deleteMovie);

module.exports = router;
