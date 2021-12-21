//открыть форму
let editButt = document.querySelector('.profile__edit-butt');
let editUserForm = document.querySelector('.popup');
let profileUserName = document.querySelector('.profile__username');
let profileUserAbout = document.querySelector('.profile__about-user');
function openUserForm(){
    if(editUserForm.classList.contains('popup_opened') === false){
        editUserForm.classList.add('popup_opened');
    }
    jobInput.value = profileUserAbout.textContent;
    nameInput.value = profileUserName.textContent;
}
editButt.addEventListener('click', openUserForm); 
//закрыть форму
let closeEditButt = document.querySelector('.popup__button-close');
function closeUserForm(){
        editUserForm.classList.remove('popup_opened');

}
closeEditButt.addEventListener('click', closeUserForm); 
//запись данных из инпутов
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
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
    editUserForm.classList.remove('popup_opened');
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);