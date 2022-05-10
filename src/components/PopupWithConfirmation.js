import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._formSubmitButtonElement = this._form.querySelector('.popup__button-save');
    }

    setEventListeners(){
        this._form.addEventListener('submit', (evt) => this._handleSubmitButton(evt))
        super.setEventListeners();
    }

    handleButtonElement(submit){
        this._handleSubmitButton = submit; 
    }

    isConfirmProgress(isDownload) {
        if (isDownload === true) {
            this._formSubmitButtonElement.textContent = 'Удаление...';
            this._formSubmitButtonElement.classList.add('popup__button-save_inactive');
        } else {
            this._formSubmitButtonElement.textContent = 'Да';
            this._formSubmitButtonElement.classList.remove('popup__button-save_inactive');
        }
    }
}