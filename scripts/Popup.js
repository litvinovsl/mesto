export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__button-close');
        this._popupOverlay = this._popup.querySelector('.popup__overlay');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        console.log('open');
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(){
        console.log('close');
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    }

    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    setEventListeners(){
        this._popupOverlay.addEventListener('click', () => {
            this.close();
        });
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        });
    }
}