export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._data = data;
        this._handleCardClick = handleCardClick;
        
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        this._element.querySelector('.element__name').textContent = this._title;

        return this._element;
    }
   
    _setEventListeners() {
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_active');
        });

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._element.remove();
        });
    }
}