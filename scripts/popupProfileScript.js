//открыть форму
let editButt = document.querySelector('.profile__edit-butt');
let editUserForm = document.querySelector('#popup-user');
let profileUserName = document.querySelector('.profile__username');
let profileUserAbout = document.querySelector('.profile__about-user');
function openPopup(editUserForm){
    if(editUserForm.classList.contains('popup_opened') === false){
        editUserForm.classList.add('popup_opened');
    }
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
let closeEditButt = document.querySelector('.popup__button-close');
closeEditButt.addEventListener('click', function(){
    popupClose(editUserForm);
}); 
//запись данных из инпутов
// Находим форму в DOM
let formElement = document.querySelector('#form-profile');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#popup__username');
let jobInput = formElement.querySelector('#popup__user-about');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
    // Получил значение полей jobInput и nameInput из свойства value
    let newUser = nameInput.value;
    let newAboutUser = jobInput.value;    
    // Вставил новые значения с помощью textContent
    profileUserAbout.textContent = newAboutUser;
    profileUserName.textContent = newUser; 
    popupClose(editUserForm);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//-----------------------------------------------------------------------------------------
//=========================================================================================
let plusButt = document.querySelector('.profile__add-button');
let createCloseButt = document.querySelector('#popup-card-close');
let popupCreate = document.querySelector('#popup-create');
plusButt.addEventListener('click', function(){
    document.querySelector('#popup__place-name').value = '';
    document.querySelector('#popup__place-link').value = '';
    openPopup(popupCreate);
}); 
createCloseButt.addEventListener('click', function(){
    popupClose(popupCreate);
}); 

//==========================================================================================
const initialCards = [
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


const cardConteuner = document.querySelector('.elements');
const createButt = document.querySelector('#create-button');


// появление 6 начальных картинок из массива объектов
initialCards.map(function(li){
    addCard(li.link, li.name);
});

function addCard(cardImage, cardName){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    

    cardElement.querySelector('.element__image').src = cardImage;
    cardElement.querySelector('.element__name').textContent = cardName;

    cardConteuner.prepend(cardElement); //установка карточек в начало контенера
    
    cardElement.querySelector('.element__delete').addEventListener('click', function(evt){
        evt.target.parentElement.remove();
    });//удаление карточки путем удаления родительского элемента кнопки

    cardElement.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active');
    });//установка лайка по клику
};

createButt.addEventListener('click', function () {

    const placeImg = document.querySelector('#popup__place-link');
    const namePlace = document.querySelector('#popup__place-name');
  
    addCard(placeImg.value, namePlace.value);
    popupClose(popupCreate);
    
});

