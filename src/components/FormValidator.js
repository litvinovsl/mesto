export default class FormValidator {
  constructor(settings, popupForm) {
    this._popupForm = popupForm;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._buttonSelector = settings.buttonSelector;
    this._inputError = settings.inputError;
    this._inputSpanError = settings.inputSpanError;
    this._buttonSelectorInactive = settings.buttonSelectorInactive;
    this._inputs = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._errors = Array.from(this._popupForm.querySelectorAll(settings.errorSelector));
  }

  _isValid(element) {
    !element.validity.valid
      ? this._showInputError(element)
      : this._hideInputError(element);
  }

  _showInputError(element) {
    const formError = this._popupForm.querySelector(`.${element.id}-error`);
    
    element.classList.add(this._inputError);
    formError.textContent = element.validationMessage;
    formError.classList.add(this._inputSpanError);
  }

  _hideInputError(element) {
    console.log('_hideInputError - this ', element)
    const formError = this._popupForm.querySelector(`.${element.id}-error`);

    element.classList.remove(this._inputError);
    formError.classList.remove(this._inputSpanError);
    formError.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState() {
    if (this._buttonSelector === null) { return }
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._buttonSelectorInactive);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._buttonSelectorInactive);
      this._button.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._button = this._popupForm.querySelector(this._buttonSelector);
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}