//открыть форму
let editButt = document.querySelector('.profile__edit-butt');
let editUserForm = document.querySelector('.popup__conteiner');
function openUserForm(){
    if(editUserForm.classList.contains('popup_opened') === false){
        editUserForm.classList.add('popup_opened');
    }
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
let nameInput = formElement.querySelector('.popup__user-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__about-user');// Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let newUser = nameInput.value;
    let newAboutUser = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileUserName = document.querySelector('.profile__username');
    let profileUserAbout = document.querySelector('.profile__about-user');
    console.log(profileUserName);
    console.log(profileUserAbout);
    // Вставьте новые значения с помощью textContent
    profileUserAbout.textContent = newAboutUser;
    profileUserName.textContent = newUser;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);