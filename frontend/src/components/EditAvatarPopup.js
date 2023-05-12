import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const link = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: link.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      formName="avatar"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={link}
        className="form__input form__input_type_link-add"
        id="input-avatarForm"
        name="linkForm"
        type="url"
        placeholder="Ссылка на аватар"
        autoComplete="off"
        onChange={(e) => (link.current.value = e.target.value)}
      />
      <span className="form__input-error input-avatarForm-error">hgh</span>
    </PopupWithForm>
  );
}
