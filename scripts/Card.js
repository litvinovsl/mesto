export class Card {
    constructor(data, selector, cardSelector, handleCardClick) {
        console.log('card constructor: ', data, selector, cardSelector, handleCardClick);
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._popupName = selector.popupName;
        this._popupImg = selector.popupImg;
        this._popupCard = selector.popupCard;
        this._handleCardClick = handleCardClick;
        
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._elementImage = this._element.querySelector('.element__image');

        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        this._element.querySelector('.element__name').textContent = this._title;

        return this._element;
    }

    _handleOpenPopup() {
        this._popupImg.src = this._image;
        this._popupImg.alt = this._title;
        this._popupName.textContent = this._title;
        this._handleCardClick(this._popupCard);
    }

   
    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_active');
        })

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._element.remove();
        })
    }
}