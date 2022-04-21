export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = document.querySelector('.popup__button-close');
        this._popupOverlay = document.querySelector('.popup__overlay');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(){
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners(){
        this._popupOverlay.addEventListener('click', () => {
            this.close;
        });
        this._popupCloseButton.addEventListener('click', () => {
            this.close;
        });
    }
}