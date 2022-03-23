const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button-save',
  inputError: 'popup__input_error',
  inputSpanError: 'popup__input-error_active',
  buttonSelectorInactive: 'popup__button-save_inactive'
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settings.inputError);
  formError.textContent = errorMessage;
  formError.classList.add(settings.inputSpanError);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, settings) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputError);
  formError.classList.remove(settings.inputSpanError);
  formError.textContent = '';
};

//Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать.
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (buttonElement === null) { return }
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.buttonSelectorInactive);
    buttonElement.setAttribute('disabled', true);

  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.buttonSelectorInactive);
    buttonElement.removeAttribute('disabled');

  }

};

const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.buttonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, settings);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};


const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, settings);
  });
};

// Вызовем функцию
enableValidation(validationSettings); 

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, settings);
  }
};

