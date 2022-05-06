import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  editButt,
  editUserForm,
  plusButt,
  popupCreate,
  initialCards,
  validationSettings,
  avatarBatton,
  updateAvatarForm,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '6cbd57a7-9435-4249-951e-f8947dba9801',
    'Content-Type': 'application/json'
  }
}); 

function createCard(item){
  const card = new Card(item, '#card-template', (data) => {
    imagePopup.open(data.name, data.link);
  });
  const cardElement = card.generateCard();
  return cardElement
}

//==============================================================================================================
//все с профилем

const userInfo = new UserInfo({
  nameSelector: '.profile__username', 
  aboutSelector: '.profile__about-user', 
  avatarSelector: '.profile__avatar'
});

const popupUser = new PopupWithForm('#popup-user', (user) => {
  api.updateUserInfo({name: user.name, about: user.about})
    .then((data) => {
      userInfo.setUserInfo(data);
    });
});
popupUser.setEventListeners();
editButt.addEventListener('click', function () {

  const data = userInfo.getUserInfo();
  popupUser.fillInputs(data);
  editPopupValidator.resetValidation();
  popupUser.open();
});



//==========================================================================
//все для аватара

const popupAvatar = new PopupWithForm('#popup-update-avatar', (user) => {
api.updateProfileAvatar({avatar: user.link}).then((data) => {
  userInfo.setUserAvatar({avatarLink: data.avatar});
});


});

popupAvatar.setEventListeners();

avatarBatton.addEventListener('click', function(){
  avatarFormValidation.resetValidation();
  popupAvatar.open();
})

//==========================================================================
//Валидация

const editPopupValidator = new FormValidator(validationSettings, editUserForm);
const createPopupValidator = new FormValidator(validationSettings, popupCreate);
const avatarFormValidation = new FormValidator(validationSettings, updateAvatarForm);
avatarFormValidation.enableValidation();
editPopupValidator.enableValidation();
createPopupValidator.enableValidation();

//===========================================================================
//================================================================================================================
//все с карточками

const popupCreateCard = new PopupWithForm('#popup-create', (item) => {
  console.log(item);
  
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
});
popupCreateCard.setEventListeners();

plusButt.addEventListener('click', function(){
  createPopupValidator.resetValidation();
  popupCreateCard.open();
});

//==================================================

const imagePopup = new PopupWithImage('#popup-card');
imagePopup.setEventListeners();

const cardSection = new Section({
  renderer: function(item) {
    
    const cardElement = createCard(item);
    this.addItem(cardElement);
  },  
}, '.elements');

api.addCards().then((data) => {
    cardSection.renderItems(data);
});
cardSection.renderItems(initialCards);

//======================================================================

// профиль пользователя(имя о себе аватар _id и тд)
// fetch('https://nomoreparties.co/v1/cohort-40/users/me', {
//   headers: {
//     authorization: '6cbd57a7-9435-4249-951e-f8947dba9801'
//   }
// })
//   .then(res => res.json())
//   .then((data) => {
//     console.log(data);
// });


//массив карточек с инфой
// fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
//   headers: {
//     authorization: '6cbd57a7-9435-4249-951e-f8947dba9801'
//   }
// })
//   .then(res => res.json())
//   .then((data) => {
//     console.log(data);
// });

//avatar

// fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar', {
//   method: 'PATCH',
//   headers: {
//     authorization: '6cbd57a7-9435-4249-951e-f8947dba9801'
//   },
//   headers: {
//     authorization: '6cbd57a7-9435-4249-951e-f8947dba9801',
//    'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     avatar: 'https://www.50languages.com/template/img/58755931.jpg',
//   })
// })
  

//запрос на редактировнные данные профиля
// fetch('https://mesto.nomoreparties.co/v1/cohort-40/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: '6cbd57a7-9435-4249-951e-f8947dba9801',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Litvinov Sergey',
//     about: 'student'
//   })
// })
//   .then(res => res.json())
//   .then((data) => {
//     console.log(data);
// });

//добавление новой карточки
// fetch('https://mesto.nomoreparties.co/v1/cohort-40/cards', {
//   method: 'PATCH',
//   headers: {
//     authorization: '6cbd57a7-9435-4249-951e-f8947dba9801',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Litvinov Sergey',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   })
// })
//   .then(res => res.json())
//   .then((data) => {
//     console.log(data);
// });
  
