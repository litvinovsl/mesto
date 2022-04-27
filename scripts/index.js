import {validationSettings, FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


//открыть форму
const editButt = document.querySelector('.profile__edit-butt');
const editUserForm = document.querySelector('#popup-user');
const profileUserName = document.querySelector('.profile__username');
const profileUserAbout = document.querySelector('.profile__about-user');

//============================================================================

const popupUser = new PopupWithForm('#popup-user', (user) => {debugger

});
editButt.addEventListener('click', function () {
  popupUser.open();
  // jobInput.value = profileUserAbout.textContent;
  // nameInput.value = profileUserName.textContent;
  // openPopup(editUserForm);
  // editPopupValidator.resetValidation();
});




//============================================================================


// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keyup', handleEscKey);
// }
// function handleEscKey(e) {
//   if (e.key != 'Escape') { return; }
//   const popup = document.querySelector('.popup_opened');
//   if (popup != null) {
//     closePopup(popup);
//   }
// }
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keyup', handleEscKey);
// };

//=========================================================================================
const plusButt = document.querySelector('.profile__add-button');
const createCloseButt = document.querySelector('#popup-card-close');
const popupCreate = document.querySelector('#popup-create');
const placeImg = document.forms.formPlace.elements.placeLink;
const namePlace = document.forms.formPlace.elements.placeName;
//=============================================================
const editPopupValidator = new FormValidator(validationSettings, editUserForm);
const createPopupValidator = new FormValidator(validationSettings, popupCreate);
//* Активация валидации
editPopupValidator.enableValidation();
createPopupValidator.enableValidation();
//==================================================================

// editButt.addEventListener('click', function () {
//   jobInput.value = profileUserAbout.textContent;
//   nameInput.value = profileUserName.textContent;
//   openPopup(editUserForm);
//   editPopupValidator.resetValidation();
// });
const popupUserClose = document.querySelector('#popup-user-close');
// popupUserClose.addEventListener('click',function () {
//   closePopup(editUserForm);
// });
//запись данных из инпутов
// Находим форму в DOM
const profileForm = document.forms.profileForm;
// Находим поля формы в DOM
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.aboutUser;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//   // Так мы можем определить свою логику отправки. 
//   // Вставил новые значения с помощью textContent
//   profileUserAbout.textContent = jobInput.value;
//   profileUserName.textContent = nameInput.value;
//   closePopup(editUserForm);
// }
// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// profileForm.addEventListener('submit', handleProfileFormSubmit);

// plusButt.addEventListener('click', function () {
  
//   namePlace.value = '';
//   placeImg.value = '';
//   openPopup(popupCreate);
//   createPopupValidator.resetValidation();
// });
// createCloseButt.addEventListener('click', function () {
//   closePopup(popupCreate);
// });

// const cardContainer = document.querySelector('.elements');
// const popupCard = document.querySelector('#popup-card');
// const popupCardClose = document.querySelector('#popup-closeCard');

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

const cardSel = {
  popupName: document.querySelector('.popup__img-name'),
  popupImg: document.querySelector('.popup__image'),
  popupCard: document.querySelector('#popup-card'),
  overlayOpenCard: document.querySelector('#overlayOpenCard'),
}
//==================================================================

const imagePopup = new PopupWithImage('#popup-card');

//==================================================================
const cardSection = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, cardSel, '#card-template', () => {
      imagePopup.open(item.name, item.link);
      imagePopup.setEventListeners();
    });
    const cardElement = card.generateCard();
    return cardElement
  },  
}, '.elements');

document.forms.formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const item = {
    name: document.forms.formPlace.elements.placeName.value,
    link: document.forms.formPlace.elements.placeLink.value,
  }
  cardSection.renderItems([item]);
})

// popupCardClose.addEventListener('click', () => {
//   closePopup(popupCard);
// })

//==================================================================
//закрытие попапов нажатием на фон

// const overlayProfile = document.querySelector('#overlayProfile');
// const overlayCreateCard = document.querySelector('#overlayCreateCard');
// const overlayOpenCard = document.querySelector('#overlayOpenCard');

// overlayProfile.addEventListener('click', function () {
//   closePopup(editUserForm);
// });
// overlayCreateCard.addEventListener('click', function () {
//   closePopup(popupCreate);
// });
// overlayOpenCard.addEventListener('click', function () {
//   closePopup(popupCard);
// });
//==================================================================
