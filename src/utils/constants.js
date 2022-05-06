export const editButt = document.querySelector('.profile__edit-butt');
export const editUserForm = document.querySelector('#popup-user');
export const plusButt = document.querySelector('.profile__add-button');
export const popupCreate = document.querySelector('#popup-create');
export const avatarBatton = document.querySelector('.profile__avatar-button');
export const updateAvatarForm = document.querySelector('#form-avatar');
export const profileAvatar = document.querySelector('.profile__avatar');
export const cardSel = {
  popupName: document.querySelector('.popup__img-name'),
  popupImg: document.querySelector('.popup__image'),
  popupCard: document.querySelector('#popup-card'),
  overlayOpenCard: document.querySelector('#overlayOpenCard'),
};
export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__button-save',
    inputError: 'popup__input_error',
    errorSelector: '.popup__input-error',
    inputSpanError: 'popup__input-error_active',
    buttonSelectorInactive: 'popup__button-save_inactive'
};
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
