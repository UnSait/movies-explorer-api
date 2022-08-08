const router = require('express').Router();
const {
  createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationSignin, validationSignup } = require('../utils/validation');
const NotFound = require('../utils/Errors/NotFound');

router.post('/signin', validationSignin, login);

router.post('/signup', validationSignup, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movie'));

router.use((req, res, next) => {
  next(new NotFound('Страницы не существует'));
});

module.exports = router;
