//открыть форму
const editButt = document.querySelector('.profile__edit-butt');
const editUserForm = document.querySelector('#popup-user');
const profileUserName = document.querySelector('.profile__username');
const profileUserAbout = document.querySelector('.profile__about-user');
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
const closeEditButt = document.querySelector('.popup__button-close');
closeEditButt.addEventListener('click', function(){
    popupClose(editUserForm);
}); 
//запись данных из инпутов
// Находим форму в DOM
const formElement = document.querySelector('#form-profile');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('#popup__username');
const jobInput = formElement.querySelector('#popup__user-about');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function sendFormProfile (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
    // Получил значение полей jobInput и nameInput из свойства value
    const newUser = nameInput.value;
    const newAboutUser = jobInput.value;    
    // Вставил новые значения с помощью textContent
    profileUserAbout.textContent = newAboutUser;
    profileUserName.textContent = newUser; 
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
const placeImg = document.querySelector('#popup__place-link');
const namePlace = document.querySelector('#popup__place-name');
plusButt.addEventListener('click', function(){
    namePlace = '';
    placeImg = '';
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
document.querySelector('#form-card').addEventListener('submit', function (evt) {
    evt.preventDefault();
    cardConteuner.prepend(createCard(placeImg.value, namePlace.value));
    popupClose(popupCreate);
});
//===================================================================
const popupPrewClose = document.querySelector('#popup-closeCard');
popupPrewClose.addEventListener('click', function(){
    popupClose(popupCard);
}); 



