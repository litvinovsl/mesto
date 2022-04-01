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

const cardContainer = document.querySelector('.elements');
const createButt = document.querySelector('#create-button');
const popupCard = document.querySelector('#popup-card');
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup__image');
const popupImgName = document.querySelector('.popup__img-name');
const popupPrewClose = document.querySelector('#popup-closeCard');

class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__name').textContent = this._title;

    return this._element;
  }

}

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement); 
})















//===============================================================================

// // появление 6 начальных картинок из массива объектов
// initialCards.forEach(function (li) {
//   const cardElement = createCard(li.link, li.name);
//   cardContainer.append(cardElement);
// });
// function createCard(cardImage, cardName) {
//   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
//   const elementImage = cardElement.querySelector('.element__image');
//   elementImage.src = cardImage;
//   elementImage.alt = cardName;
//   cardElement.querySelector('.element__name').textContent = cardName;
//   cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
//     cardElement.remove();
//     // evt.target.parentElement.remove();
//   });//удаление карточки путем удаления родительского элемента кнопки
//   cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__like_active');
//   });//установка лайка по клику
//   elementImage.addEventListener('click', function (evt) {
//     createPopapCard(cardImage, cardName);
//     openPopup(popupCard);
//   });
//   return cardElement;
// }
// function addCard(container, cardElement) {
//   container.prepend(cardElement); //установка карточек в начало контенера
// };

// function createPopapCard(img, name) {
//   popupImage.src = img;
//   popupImage.alt = name;
//   popupImgName.textContent = name;
// }
// document.forms.formPlace.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   cardContainer.prepend(createCard(placeImg.value, namePlace.value));
//   closePopup(popupCreate);
// });
// //===================================================================

// popupPrewClose.addEventListener('click', function () {
//   closePopup(popupCard);
// });