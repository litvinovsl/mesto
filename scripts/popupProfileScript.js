//открыть форму
const editButt = document.querySelector('.profile__edit-butt');
const editUserForm = document.querySelector('#popup-user');
const profileUserName = document.querySelector('.profile__username');
const profileUserAbout = document.querySelector('.profile__about-user');
function openPopup(editUserForm){
  if(editUserForm.classList.contains('popup_opened') === false){
    editUserForm.classList.add('popup_opened');
    }
    const inputList = Array.from(editUserForm.querySelectorAll('.popup__input'));
    const buttonElement = editUserForm.querySelector('.popup__button-save');
    const errorMessageAll = Array.from(document.querySelectorAll('.popup__input-error'));
  if(buttonElement != null){
    
    toggleButtonState(inputList, buttonElement);
    errorMessageAll.forEach((errorMessage) =>{
      errorMessage.textContent = '';
    });
    inputList.forEach((inputElement) => {
      inputElement.classList.remove('popup__input_error');
    });
  };

  const closePopupButton = editUserForm.querySelector('.popup__button-close');
  closePopupButton.addEventListener('click', () => popupClose(editUserForm));
  
  document.addEventListener('keyup', keyHandler);
}
// document.addEventListener('keyup', function(e){
//   if(e.key != 'Escape'){return;}
//   const popup = document.querySelector('.popup_opened');
//   if(popup != null){
//     popup.classList.remove('popup_opened');
//   }
// })
// function closeEscape(evt) {
//   console.log(evt.key);
//     if (evt.key === 'Escape') {
//       popupClose(editUserForm);
//       };
// };
function keyHandler(e){
  console.log(e.key);
  if(e.key != 'Escape'){return;}
  const popup = document.querySelector('.popup_opened');
  if(popup != null){
    popup.classList.remove('popup_opened');
  }
  document.removeEventListener('keyup',keyHandler);
}
function popupClose(editUserForm){
    editUserForm.classList.remove('popup_opened');
    document.removeEventListener('keyup',keyHandler);
};


editButt.addEventListener('click', function(){
    jobInput.value = profileUserAbout.textContent;
    nameInput.value = profileUserName.textContent;
    openPopup(editUserForm);
}); 
//закрыть форму
// const closeEditButt = document.querySelector('.popup__button-close');
// closeEditButt.addEventListener('click', function(){
//     popupClose(editUserForm);
// }); 
//запись данных из инпутов
// Находим форму в DOM
const formElement = document.forms.formProfile;
// Находим поля формы в DOM
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.aboutUser;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function sendFormProfile (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки. 
    // Вставил новые значения с помощью textContent
    profileUserAbout.textContent = jobInput.value; 
    profileUserName.textContent = nameInput.value;
    popupClose(editUserForm);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', sendFormProfile);
//=========================================================================================
const plusButt = document.querySelector('.profile__add-button');
const createCloseButt = document.querySelector('#popup-card-close');
const popupCreate = document.querySelector('#popup-create');
const placeImg = document.forms.formPlace.elements.placeLink;
const namePlace = document.forms.formPlace.elements.placeName;
//=============================================================
plusButt.addEventListener('click', function(){
    namePlace.value = '';
    placeImg.value = '';
    openPopup(popupCreate);
}); 
createCloseButt.addEventListener('click', function(){
    popupClose(popupCreate);
}); 
//==========================================================================================
const cardConteuner = document.querySelector('.elements');
const createButt = document.querySelector('#create-button');
const popupCard = document.querySelector('#popup-card');
const cardTemplate = document.querySelector('#card-template').content;
// появление 6 начальных картинок из массива объектов
initialCards.forEach(function(li){
    const cardElement = createCard(li.link, li.name);
    cardConteuner.append(cardElement);
});
function createCard (cardImage, cardName){
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = cardImage;
    cardElement.querySelector('.element__name').textContent = cardName;
    cardElement.querySelector('.element__delete').addEventListener('click', function(evt){
        evt.target.parentElement.remove();
    });//удаление карточки путем удаления родительского элемента кнопки
    cardElement.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
    });//установка лайка по клику
    cardElement.querySelector('.element__image').addEventListener('click', function(evt){
        createPopapCard(cardImage, cardName);
        openPopup(popupCard);
    });  
    return cardElement;
}
function addCard(container, cardElement){
    container.prepend(cardElement); //установка карточек в начало контенера
};
const popupImage = document.querySelector('.popup__image');
const popupImgName = document.querySelector('.popup__img-name');
function createPopapCard(img, name){
    popupImage.src = img;
    popupImgName.textContent = name;
}
document.forms.formPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    cardConteuner.prepend(createCard(placeImg.value, namePlace.value));
    popupClose(popupCreate);
});
//===================================================================
const popupPrewClose = document.querySelector('#popup-closeCard');
popupPrewClose.addEventListener('click', function(){
    popupClose(popupCard);
}); 
//==================================================================
//закрытие попапов нажатием на фон
const overlayProfile = document.querySelector('#overlayProfile');
const overlayCreateCard = document.querySelector('#overlayCreateCard');
const overlayOpenCard = document.querySelector('#overlayOpenCard');
  
overlayProfile.addEventListener('click', function(){
  popupClose(editUserForm);
});
overlayCreateCard.addEventListener('click', function(){
  popupClose(popupCreate);
});
overlayOpenCard.addEventListener('click', function(){
  popupClose(popupCard);
});
//закрытие попапов нажатием на esc
// function keyHandler(evt) {
//   if (evt.key === 'Escape') {
//     popupClose(editUserForm);
//     popupClose(popupCreate);
//   }
// }
// nameInput.addEventListener('keydown', keyHandler);
// jobInput.addEventListener('keydown', keyHandler);
// placeImg.addEventListener('keydown', keyHandler);
// namePlace.addEventListener('keydown', keyHandler);