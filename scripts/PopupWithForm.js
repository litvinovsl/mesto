import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitButton){
        super(popupSelector);
        this._handleSubmitButton = handleSubmitButton;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formSubmitButton = this._form.querySelector('.popup__button-save')
        
    }

    _getInputValues(){
        this._inputValues = {};

        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        
        return this._inputValues
    }

    setEventListeners(){
        console.log(this._formSubmitButton);
        this._formSubmitButton.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._handleSubmitButton(this._getInputValues());
            this.close();
        } );
        super.setEventListeners();
    }

    close(){
        this._inputList.forEach(input => {
            input.value = '';
        });
        super.close();
    }
    
}