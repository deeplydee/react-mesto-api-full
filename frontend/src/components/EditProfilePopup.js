import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      textButton={!isLoading ? 'Сохранить' : 'Сохранение...'}
    >
      <input
        className="popup__data-input popup__data-input_type_profile-name"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        id="profile-name-input"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span
        className="popup__error popup__error_visible"
        id="profile-name-input-error"
      ></span>
      <input
        className="popup__data-input popup__data-input_type_profile-description"
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        id="profile-description-input"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span
        className="popup__error popup__error_visible"
        id="profile-description-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
