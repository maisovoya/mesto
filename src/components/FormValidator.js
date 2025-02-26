export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = document.querySelector(form).querySelector('.popup__form');
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._inputList = this._form.querySelectorAll(config.inputSelector);
  }

  //показать ошибку
  _showError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputInvalidClass);
  }
  //скрыть ошибку
  _hideError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._config.inputInvalidClass);
  }
  //проверять конкретный инпут на валидность
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }
  //проверять состояние кнопки
  _setButtonState() {
    if (this._form.checkValidity()) {
      this._submitButton.classList.remove(this._config.buttonInvalidClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._config.buttonInvalidClass);
      this._submitButton.disabled = true;
    }
  }

  _setEventListener() {
    //повесить на каждый инпут обработчик событий
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListener()
    //для каждой формы запрещаем действие по умолчанию
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    //при загрузке страницы - все кнопки заблокированы
    this._setButtonState();
  }
    
  //отдельный  метод для очистки ошибок и управления кнопкой
  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideError(input)
    });

    this._setButtonState();
  }
}







