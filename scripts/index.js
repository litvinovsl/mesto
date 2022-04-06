import {validationSettings, FormValidator} from './FormValidator.js';
import {Card} from './Card.js';


//открыть форму
const editButt = document.querySelector('.profile__edit-butt');
const editUserForm = document.querySelector('#popup-user');
const profileUserName = document.querySelector('.profile__username');
const profileUserAbout = document.querySelector('.profile__about-user');
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscKey);
}
function handleEscKey(e) {
  console.log(e.key);
  if (e.key != 'Escape') { return; }
  const popup = document.querySelector('.popup_opened');
  if (popup != null) {
    closePopup(popup);
  }
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscKey);
};

function cleanInputError(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  const buttonElement = popup.querySelector('.popup__button-save');
  const errorMessageAll = Array.from(document.querySelectorAll('.popup__input-error'));
  editPopupValidator.enableValidation();
  errorMessageAll.forEach((errorMessage) => {
    errorMessage.textContent = '';
  });
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_error');
  });
}

editButt.addEventListener('click', function () {
  jobInput.value = profileUserAbout.textContent;
  nameInput.value = profileUserName.textContent;
  openPopup(editUserForm);
  cleanInputError(editUserForm);
});
const popupUserClose = document.querySelector('#popup-user-close');
popupUserClose.addEventListener('click',function () {
  closePopup(editUserForm);
});
//запись данных из инпутов
// Находим форму в DOM
const profileForm = document.forms.profileForm;
// Находим поля формы в DOM
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.aboutUser;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки. 
  // Вставил новые значения с помощью textContent
  profileUserAbout.textContent = jobInput.value;
  profileUserName.textContent = nameInput.value;
  closePopup(editUserForm);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit);
//=========================================================================================
const plusButt = document.querySelector('.profile__add-button');
const createCloseButt = document.querySelector('#popup-card-close');
const popupCreate = document.querySelector('#popup-create');
const placeImg = document.forms.formPlace.elements.placeLink;
const namePlace = document.forms.formPlace.elements.placeName;
//=============================================================
plusButt.addEventListener('click', function () {
  
  namePlace.value = '';
  placeImg.value = '';
  openPopup(popupCreate);
  cleanInputError(popupCreate);
});
createCloseButt.addEventListener('click', function () {
  closePopup(popupCreate);
});

//========================================

const editPopupValidator = new FormValidator(validationSettings, editUserForm);
const createPopupValidator = new FormValidator(validationSettings, popupCreate);

//* Активация валидации
editPopupValidator.enableValidation();
createPopupValidator.enableValidation();

//==================================================================




const cardContainer = document.querySelector('.elements');
const popupCard = document.querySelector('#popup-card');


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

document.forms.formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const obj = {
    name: document.forms.formPlace.elements.placeName.value,
    link: document.forms.formPlace.elements.placeLink.value,
  }


  const card = new Card(obj,cardSel, '#card-template');
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement); 

  
})




initialCards.forEach((item) => {
  const card = new Card(item, cardSel, '#card-template');
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement); 
})

//==================================================================
//закрытие попапов нажатием на фон
const overlayProfile = document.querySelector('#overlayProfile');
const overlayCreateCard = document.querySelector('#overlayCreateCard');

overlayProfile.addEventListener('click', function () {
  closePopup(editUserForm);
});
overlayCreateCard.addEventListener('click', function () {
  closePopup(popupCreate);
});

