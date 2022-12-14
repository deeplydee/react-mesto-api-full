require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');

const auth = require('./middlewares/auth');
const { createUser, login, signOut } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const { routes } = require('./routes');
const { regex } = require('./helpers/constants');
const NotFoundError = require('./helpers/errors/not-found-error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors({
  origin: ['http://localhost:3001', 'https://localhost:3001'],
  credentials: true,
}));

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
  }
}

main();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regex),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regex),
    }),
  }),
  createUser,
);

app.use('/signout', signOut);

app.use(auth);

app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});
