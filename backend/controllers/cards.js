const Card = require('../models/card');

const { CREATED_CODE } = require('../helpers/constants');

const BadRequestError = require('../helpers/errors/bad-request-error');
const ForbiddenError = require('../helpers/errors/forbidden-error');
const NotFoundError = require('../helpers/errors/not-found-error');

const getCards = async (req, res, next) => { // get '/cards/'
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => { // post '/cards/'
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(CREATED_CODE).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      return;
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => { // delete '/cards/:cardId'
  try {
    const card = await Card.findById({ _id: req.params.cardId });
    if (!card) {
      next(new NotFoundError('Карточка с указанным id не найдена'));
      return;
    }
    if (card.owner.toString() !== req.user._id) {
      next(new ForbiddenError('Можно удалять только свои карточки'));
      return;
    }
    const delCard = await Card.findByIdAndRemove({ _id: req.params.cardId });
    res.send({ message: 'Карточка успешно удалена', delCard });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
      return;
    }
    next(err);
  }
};

const likeCard = async (req, res, next) => { // put '/cards/:cardId/likes'
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Передан несуществующий id карточки'));
      return;
    }
    res.send({ message: 'Карточке поставлен лайк', card });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      return;
    }
    next(err);
  }
};

const dislikeCard = async (req, res, next) => { // delete '/cards/:cardId/likes'
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFoundError('Передан несуществующий id карточки'));
      return;
    }
    res.send({ message: 'У карточки снят лайк' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
