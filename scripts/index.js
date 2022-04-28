import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {
  editButt,
  editUserForm,
  plusButt,
  popupCreate,
  cardSel,
  initialCards,
  validationSettings
} from '../src/utils/constants.js';

const userInfo = new UserInfo({nameSelector: '.profile__username', aboutSelector: '.profile__about-user'});
const popupUser = new PopupWithForm('#popup-user', (user) => {
  userInfo.setUserInfo(user);
});
popupUser.setEventListeners();
editButt.addEventListener('click', function () {
  console.log(userInfo.getUserInfo());

  const data = userInfo.getUserInfo();
  popupUser.open(data);
  editPopupValidator.resetValidation();
});

const popupCreateCard = new PopupWithForm('#popup-create', (card) => {
  console.log('popupCreate - card ', [card]);
  cardSection.renderItems([card]);
});
popupCreateCard.setEventListeners();

plusButt.addEventListener('click', function(){
  const data = {
    name: '',
    link: ''
  }
  popupCreateCard.open(data);
  createPopupValidator.resetValidation();
})

const editPopupValidator = new FormValidator(validationSettings, editUserForm);
const createPopupValidator = new FormValidator(validationSettings, popupCreate);
//* Активация валидации
editPopupValidator.enableValidation();
createPopupValidator.enableValidation();


const imagePopup = new PopupWithImage('#popup-card');
imagePopup.setEventListeners();

const cardSection = new Section({
  items: initialCards, 
  renderer: (item) => {
    const card = new Card(item, cardSel, '#card-template', () => {
      imagePopup.open(item.name, item.link);
      
    });
    const cardElement = card.generateCard();
    return cardElement
  },  
}, '.elements');
