const express = require('express');
const {
  getCards,
  deleteCard,
  addCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateAddCard, validateDeleteCard, validateLikeCard } = require('../middlewares/validation');

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateAddCard, addCard);
cardsRouter.delete('/:cardId', validateDeleteCard, deleteCard);
cardsRouter.put('/:cardId/likes', validateLikeCard, likeCard);
cardsRouter.delete('/:cardId/likes', validateLikeCard, dislikeCard);

module.exports = cardsRouter;
