import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      formName="myForm"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_name"
        id="input-userName"
        name="userName"
        type="text"
        placeholder="Имя"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form__input-error input-userName-error"></span>
      <input
        className="form__input form__input_type_about"
        id="input-aboutUser"
        name="aboutUser"
        type="text"
        placeholder="О себе"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="form__input-error input-aboutUser-error"></span>
    </PopupWithForm>
  );
}
