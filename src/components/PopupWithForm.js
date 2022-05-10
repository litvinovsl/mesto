import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitButton){
        super(popupSelector);
        this._handleSubmitButton = handleSubmitButton;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formSubmitButtonElement = this._form.querySelector('.popup__button-save');
    }

    fillInputs(data){
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }

    _getInputValues(){
        const inputValues = {};

        this._inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues
    }

    setEventListeners(){
        this._form.addEventListener('submit',() => {
            this._handleSubmitButton(this._getInputValues());
        } );
        super.setEventListeners();
    }

    isDownloadProgress(isDownload) {
        if (isDownload === true) {
            this._formSubmitButtonElement.textContent = 'Сохранение...';
            this._formSubmitButtonElement.classList.add('popup__button-save_inactive');
        } else {
            this._formSubmitButtonElement.textContent = 'Сохранить';
            this._formSubmitButtonElement.classList.remove('popup__button-save_inactive');
        }
      }

    close(){
        super.close();
        this._form.reset();
    }
    
}