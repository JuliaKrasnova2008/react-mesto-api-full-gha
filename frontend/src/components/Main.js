import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__elements">
          <div className="profile__overlay" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              alt="Аватар пользователя"
              src={currentUser.avatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__title-edit">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>

        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((obj) => (
            <Card
              card={obj}
              key={obj._id}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
