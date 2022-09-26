import { useEffect, useState } from 'react';

import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: title,
      link: link,
    });
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      textButton={!isLoading ? 'Создать' : 'Сохранение...'}
    >
      <input
        className="popup__data-input popup__data-input_type_card-name"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="card-name-input"
        value={title}
        onChange={handleTitleChange}
      />
      <span
        className="popup__error popup__error_visible"
        id="card-name-input-error"
      ></span>
      <input
        className="popup__data-input popup__data-input_type_card-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        id="card-link-input"
        value={link}
        onChange={handleLinkChange}
      />
      <span
        className="popup__error popup__error_visible"
        id="card-link-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
