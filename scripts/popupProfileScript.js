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
  toggleButtonState(inputList, buttonElement, validationSettings);
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
//==========================================================================================
const cardContainer = document.querySelector('.elements');
const createButt = document.querySelector('#create-button');
const popupCard = document.querySelector('#popup-card');
const cardTemplate = document.querySelector('#card-template').content;
// появление 6 начальных картинок из массива объектов
initialCards.forEach(function (li) {
  const cardElement = createCard(li.link, li.name);
  cardContainer.append(cardElement);
});
function createCard(cardImage, cardName) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = cardImage;
  elementImage.alt = cardName;
  cardElement.querySelector('.element__name').textContent = cardName;
  cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
    cardElement.remove();
    // evt.target.parentElement.remove();
  });//удаление карточки путем удаления родительского элемента кнопки
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });//установка лайка по клику
  elementImage.addEventListener('click', function (evt) {
    createPopapCard(cardImage, cardName);
    openPopup(popupCard);
  });
  return cardElement;
}
function addCard(container, cardElement) {
  container.prepend(cardElement); //установка карточек в начало контенера
};
const popupImage = document.querySelector('.popup__image');
const popupImgName = document.querySelector('.popup__img-name');
function createPopapCard(img, name) {
  popupImage.src = img;
  popupImage.alt = name;
  popupImgName.textContent = name;
}
document.forms.formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard(placeImg.value, namePlace.value));
  closePopup(popupCreate);
});
//===================================================================
const popupPrewClose = document.querySelector('#popup-closeCard');
popupPrewClose.addEventListener('click', function () {
  closePopup(popupCard);
});
//==================================================================
//закрытие попапов нажатием на фон
const overlayProfile = document.querySelector('#overlayProfile');
const overlayCreateCard = document.querySelector('#overlayCreateCard');
const overlayOpenCard = document.querySelector('#overlayOpenCard');

overlayProfile.addEventListener('click', function () {
  closePopup(editUserForm);
});
overlayCreateCard.addEventListener('click', function () {
  closePopup(popupCreate);
});
overlayOpenCard.addEventListener('click', function () {
  closePopup(popupCard);
});