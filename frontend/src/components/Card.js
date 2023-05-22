import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ obj, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = obj.owner === currentUser._id;
  const isLiked = obj.likes.some((i) => i === currentUser._id);
  const cardLikesBtnClassName = `elements__favorite${isLiked ? "_active" : ""
    } btn`;

  return (
    <li className="elements__card">
      <img
        className="elements__foto"
        src={obj.link}
        alt={obj.name}
        onClick={() => onCardClick(obj)}
      />
      <div className="elements__item">
        <p className="elements__title">{obj.name}</p>
        <div className="elements__favorite-group">
          <button
            type="button"
            className={cardLikesBtnClassName}
            aria-label="Сердечко"
            onClick={() => onCardLike(obj)}
          ></button>
          <p className="elements__favorite-num">{obj.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="elements__delete btn"
          onClick={() => onCardDelete(obj)}
        ></button>
      )}
    </li>
  );
}
