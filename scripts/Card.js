export class Card {
    constructor(data, selector, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._popupName = selector.popupName;
        this._popupImg = selector.popupImg;
        this._popupCard = selector.popupCard;
        this._overlayOpenCard = selector.overlayOpenCard;

    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__name').textContent = this._title;

        return this._element;
    }

    _handleOpenPopup() {
        this._popupImg.src = this._image;
        this._popupName.textContent = this._title;
        this._popupCard.classList.add('popup_opened');
        document.addEventListener("keyup",(evt) => {
            this._handleEscClose(evt);
        } );
    }

    _handleClosePopup() {
        document.removeEventListener("keyup",(evt) => {
            this._handleEscClose(evt);
        });
        this._popupImg.src = '';
        this._popupName.textContent = '';
        this._popupCard.classList.remove('popup_opened');
    }

    //* Метод закрытия на ESC
    _handleEscClose(evt) {
        console.log(evt.key);
        if (evt.key === "Escape") {
            this._handleClosePopup();
        }
    }

    // _handleEscKey(evt) {
    //     console.log(evt.key);
    //     if (evt.key != 'Escape') { return; }

    //     if (this._popupCard.classList.contains('popup_opened')) {
    //         this._handleClosePopup();
    //     }
    // }

    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        document.querySelector('#popup-closeCard').addEventListener('click', () => {
            this._handleClosePopup();
        });

        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_active');
        })

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._element.remove();
        })

        overlayOpenCard.addEventListener('click', () => {
            this._handleClosePopup();
        });
    }
}