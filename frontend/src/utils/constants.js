export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__data-input',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_type_disabled',
  inputErrorClass: 'popup__data-input_type_error',
  errorClass: 'popup__error_visible',
};

export const cardListSelector = '.photo-grid__list';

export const buttonOpenPopupEditProfile = document.querySelector(
  '.profile__edit-button'
);
export const popupEditProfileForm = document.querySelector(
  '.popup__form_type_profile-edit'
);
export const popupEditProfileNameInput = document.querySelector(
  '.popup__data-input_type_profile-name'
);
export const popupEditProfileDescriptionInput = document.querySelector(
  '.popup__data-input_type_profile-description'
);

export const buttonOpenPopupAddCard = document.querySelector(
  '.profile__add-button'
);
export const popupAddCardForm = document.querySelector(
  '.popup__form_type_card-add'
);
export const popupAddCardNameInput = document.querySelector(
  '.popup__data-input_type_card-name'
);
export const popupAddCardLinkInput = document.querySelector(
  '.popup__data-input_type_card-link'
);

export const buttonOpenPopupChangeAvatar = document.querySelector(
  '.profile__avatar-button'
);
