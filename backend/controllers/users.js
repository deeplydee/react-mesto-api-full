const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { CREATED_CODE } = require('../helpers/constants');

const BadRequestError = require('../helpers/errors/bad-request-error');
const UnauthorizedError = require('../helpers/errors/unauthorized-error');
const NotFoundError = require('../helpers/errors/not-found-error');
const ConflictError = require('../helpers/errors/conflict-error');

const getUserById = async (req, res, next) => { // get '/users/:id'
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      next(new NotFoundError('Пользователь по указанному id не найден'));
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Невалидный id пользователя'));
      return;
    }
    next(err);
  }
};

const getUsers = async (req, res, next) => { // get '/users/'
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => { // post '/users/'
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    res.status(CREATED_CODE).send({
      data: user.toJSON(),
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      return;
    }
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует'));
      return;
    }
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => { // patch '/users/me'
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new NotFoundError('Пользователь с указанным id не найден'));
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      return;
    }
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Невалидный id пользователя'));
      return;
    }
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => { // patch '/users/me/avatar'
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new NotFoundError('Пользователь с указанным id не найден'));
      return;
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      return;
    }
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Невалидный id пользователя'));
      return;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = await jwt.sign(
      { _id: user._id },
      'SECRET',
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    }).send({ data: user.toJSON() });
  } catch (err) {
    next(new UnauthorizedError('Неправильные почта или пароль'));
  }
};

const getUserInfo = async (req, res, next) => { // get '/users/me'
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      next(new NotFoundError('Пользователь по указанному id не найден'));
      return;
    }
    res.send({ data: user });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getUserInfo,
};
