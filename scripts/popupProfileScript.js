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
    toggleButtonState(inputList, buttonElement);
}
function popupClose(editUserForm){
    editUserForm.classList.remove('popup_opened');

}

editButt.addEventListener('click', function(){
    jobInput.value = profileUserAbout.textContent;
    nameInput.value = profileUserName.textContent;
    openPopup(editUserForm);
}); 

//закрыть форму
const closeEditButt = document.querySelector('.popup__button-close');
closeEditButt.addEventListener('click', function(){
    popupClose(editUserForm);
}); 
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

//-----------------------------------------------------------------------------------------
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
//===================================================================

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('popup__input_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
};
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__input_error');
    formError.classList.remove('popup__input-error_active');
    formError.textContent = '';
};

//Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать.
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button-save_inactive');
    
    buttonElement.setAttribute('disabled', true);
    
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button-save_inactive');
    buttonElement.removeAttribute('disabled');
    
  }
}; 

const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button-save');
    toggleButtonState(inputList, buttonElement);
    
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement);
      });
    });
}; 

const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation();

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement);
    }
};

// //Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать.
// const hasInvalidInput = (inputList) => {
//     // проходим по этому массиву методом some
//     return inputList.some((inputElement) => {
//       // Если поле не валидно, колбэк вернёт true
//       // Обход массива прекратится и вся фунцкция
//       // hasInvalidInput вернёт true
  
//       return !inputElement.validity.valid;
//     })
//   };

// // Функция принимает массив полей ввода
// // и элемент кнопки, состояние которой нужно менять
// const toggleButtonState = (inputList, buttonElement) => {
//     // Если есть хотя бы один невалидный инпут
//     if (hasInvalidInput(inputList)) {
//       // сделай кнопку неактивной
//       buttonElement.classList.add('popup__button-save_inactive');
      
//       buttonElement.setAttribute('disabled', true);
      
//     } else {
//       // иначе сделай кнопку активной
//       buttonElement.classList.remove('popup__button-save_inactive');
//       buttonElement.removeAttribute('disabled');
      
//     }
//   }; 


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
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    popupClose(editUserForm);
    popupClose(popupCreate);
  }
}
nameInput.addEventListener('keydown', keyHandler);
jobInput.addEventListener('keydown', keyHandler);
placeImg.addEventListener('keydown', keyHandler);
namePlace.addEventListener('keydown', keyHandler);