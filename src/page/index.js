import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  editButt,
  editUserForm,
  plusButt,
  popupCreate,
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

api.getPageData().then((responses) => {
  const [cardArr, userData] = responses;
  userInfo.setUserAvatar({ avatarLink: userData.avatar });
  userInfo.setUserInfo(userData);
  userInfo.setUserId(userData._id);
  cardSection.renderItems(cardArr);
}).catch((err) => {
  console.log(err);
});

//========================================================================================

function createCard(item) {
  const card = new Card(item, '#card-template', (data) => {
    imagePopup.open(data.name, data.link);
  }, userInfo.getUserId(), () => {
    if (card.isLiked) {
      api.deleteCardLike(card.getCardId())
        .then((data) => {
          card.unsetLike();
          card.updateLikes(data.likes);
        })
        .catch((err) => { console.error(err); });
    } else {
      api.addCardLike(card.getCardId())
        .then((data) => {
          card.setLike();
          card.updateLikes(data.likes);
        })
        .catch((err) => { console.error(err); });
    }
  },
    (evt) => {
      popupDeleteCard.open();
      // const cardElement = evt.target.closest('.element');
      popupDeleteCard.handleButtonElement((evt) => {
      popupDeleteCard.isConfirmProgress(true);
        evt.preventDefault();
        api.deleteCard(card.getCardId())
          .then((data) => {
            // cardElement.remove();
            console.log(data);
            popupDeleteCard.close();
          })
          .catch((err) => { console.error(err); })
          .finally(() => {
            popupDeleteCard.isConfirmProgress(false);
          });
      })
    }
  );

  const cardElement = card.generateCard();
  card.updateLikes(item.likes);
  return cardElement
}

const popupDeleteCard = new PopupWithConfirmation('#popup-delete-card');
popupDeleteCard.setEventListeners();

//==============================================================================================================
//все с профилем

const userInfo = new UserInfo({
  nameSelector: '.profile__username',
  aboutSelector: '.profile__about-user',
  avatarSelector: '.profile__avatar'
});

const popupUser = new PopupWithForm('#popup-user', (user) => {
  popupUser.renderLoading(true);
  api.updateUserInfo({ name: user.name, about: user.about })
    .then((data) => {
      userInfo.setUserInfo(data);
      popupUser.close();
    })
    .catch((err) => { console.error(err); })
    .finally(() => {
      popupUser.renderLoading(false);
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
  popupAvatar.renderLoading(true);
  api.updateProfileAvatar({ avatar: user.link }).then((data) => {
    userInfo.setUserAvatar({ avatarLink: data.avatar });
    popupAvatar.close();
  })
    .catch((err) => { console.error(err) })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
});

popupAvatar.setEventListeners();

avatarBatton.addEventListener('click', function () {
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

//================================================================================================================
//все с карточками

const popupCreateCard = new PopupWithForm('#popup-create', (item) => {
  popupCreateCard.renderLoading(true);
  api.addNewCard(item).then((data) => {
    const cardElement = createCard(data);
    cardSection.addItem(cardElement);
    popupCreateCard.close();
  })
    .catch((err) => { console.error(err); })
    .finally(() => {
      popupCreateCard.renderLoading(false);
    });
});
popupCreateCard.setEventListeners();

plusButt.addEventListener('click', function () {
  createPopupValidator.resetValidation();
  popupCreateCard.open();
});

//==================================================

const imagePopup = new PopupWithImage('#popup-card');
imagePopup.setEventListeners();

const cardSection = new Section({
  renderer: function (item) {
    const cardElement = createCard(item);

    this.appendItem(cardElement);
  },
}, '.elements');