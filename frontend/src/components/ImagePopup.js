import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_img ${card ? "popup_opened" : ""}`}>
      <div className="popup__content-img">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть картинку"
        ></button>
        <img
          className="popup__image-preview"
          src={card?.link}
          alt={card?.name}
        />
        <h3 className="popup__title-img">{card?.name}</h3>
      </div>
    </div>
  );
}
