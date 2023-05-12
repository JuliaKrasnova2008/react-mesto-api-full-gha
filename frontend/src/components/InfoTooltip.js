import React from "react";

import fail from "../images/success.svg";
import success from "../images/fail.svg";

export default function InfoTooltip({ name, isOpen, onClose, err }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content-img">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть редактирование"
        ></button>
        <div className="infotooltip">
          <img
            className="infotooltip__image"
            src={err ? fail : success}
            alt=""
          />
          <p className="infotooltip__text">
            {err
              ? "Что-то пошло не так! Попробуйте еще раз"
              : "Вы успешно зарегистрировались!"}
          </p>
        </div>
      </div>
    </div>
  );
}
