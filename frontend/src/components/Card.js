import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeBtnClassName = `elements__favorite${isLiked ? "_active" : ""}`;

  return (
    <li className="elements__card">
      {isOwn && (
        <button
          className="elements__delete"
          type="button"
          aria-label="Удалить"
          onClick={() => onCardDelete(card)}
        ></button>
      )}

      <img
        className="elements__foto"
        onClick={() => {
          onCardClick(card);
        }}
        src={card.link}
        alt={card.name}
      />
      <div className="elements__item">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__favorite-group">
          <button
            className={cardLikeBtnClassName}
            type="button"
            aria-label="Нравится"
            onClick={() => onCardLike(card)}
          ></button>
          <span className="elements__favorite-num">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
