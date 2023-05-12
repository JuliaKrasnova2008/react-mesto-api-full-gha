import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      formName="addForm"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_type_title-add"
        id="input-titleForm"
        name="titleForm"
        type="text"
        placeholder="Название"
        autoComplete="off"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form__input-error input-titleForm-error"></span>
      <input
        className="form__input form__input_type_link-add"
        id="input-linkForm"
        name="linkForm"
        type="url"
        placeholder="Ссылка на изображение"
        autoComplete="off"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="form__input-error input-linkForm-error"></span>
    </PopupWithForm>
  );
}
