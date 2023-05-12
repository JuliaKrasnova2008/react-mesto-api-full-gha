import React from "react";

export default function PopupWithForm({
  title,
  name,
  formName,
  buttonText,
  children,
  isOpen,
  onSubmit,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть редактирование"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="form form_type_profile"
          name={formName}
          method="POST"
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="form__submit"
            type="submit"
            aria-label="Сохранить редактирование"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
