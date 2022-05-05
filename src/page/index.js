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

function createCard(item){
  const card = new Card(item, '#card-template', (data) => {
    imagePopup.open(data.name, data.link);
  });
  const cardElement = card.generateCard();
  return cardElement
}

const userInfo = new UserInfo({nameSelector: '.profile__username', aboutSelector: '.profile__about-user'});
const popupUser = new PopupWithForm('#popup-user', (user) => {
  userInfo.setUserInfo(user);
});
popupUser.setEventListeners();
editButt.addEventListener('click', function () {

  const data = userInfo.getUserInfo();
  popupUser.fillInputs(data);
  editPopupValidator.resetValidation();
  popupUser.open();
});

const popupCreateCard = new PopupWithForm('#popup-create', (item) => {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
});
popupCreateCard.setEventListeners();

plusButt.addEventListener('click', function(){
  createPopupValidator.resetValidation();
  popupCreateCard.open();
});

const editPopupValidator = new FormValidator(validationSettings, editUserForm);
const createPopupValidator = new FormValidator(validationSettings, popupCreate);
editPopupValidator.enableValidation();
createPopupValidator.enableValidation();


const imagePopup = new PopupWithImage('#popup-card');
imagePopup.setEventListeners();

const cardSection = new Section({
  renderer: function(item) {
    // const card = new Card(item, cardSel, '#card-template', () => {
    //   imagePopup.open(item.name, item.link);
    // });
    // const cardElement = card.generateCard();
    // return cardElement
    // console.log(this);
    // debugger
    
    const cardElement = createCard(item);
    this.addItem(cardElement);
  },  
}, '.elements');
cardSection.renderItems(initialCards);


