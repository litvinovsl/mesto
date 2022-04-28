import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editButt,
  editUserForm,
  plusButt,
  popupCreate,
  cardSel,
  initialCards,
  validationSettings
} from '../utils/constants.js';

const userInfo = new UserInfo({nameSelector: '.profile__username', aboutSelector: '.profile__about-user'});
const popupUser = new PopupWithForm('#popup-user', (user) => {
  userInfo.setUserInfo(user);
});
popupUser.setEventListeners();
editButt.addEventListener('click', function () {

  const data = userInfo.getUserInfo();
  popupUser.open(data);
  editPopupValidator.resetValidation();
});

const popupCreateCard = new PopupWithForm('#popup-create', (card) => {
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
