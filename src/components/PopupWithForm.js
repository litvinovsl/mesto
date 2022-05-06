import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitButton){
        super(popupSelector);
        this._handleSubmitButton = handleSubmitButton;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
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
            this.close();
        } );
        super.setEventListeners();
    }

    close(){
        super.close();
        this._form.reset();
    }
    
}