import { useRef, useEffect } from 'react';

import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      textButton={!isLoading ? 'Сохранить' : 'Сохранение...'}
    >
      <input
        className="popup__data-input popup__data-input_type_avatar-link"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        id="avatar-link-input"
        ref={avatarRef}
      />
      <span
        className="popup__error popup__error_visible"
        id="avatar-link-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
