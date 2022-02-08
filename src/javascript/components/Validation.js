import { BaseComponent } from './BaseComponent';

export class Validation extends BaseComponent {
  constructor(validationData) {
    super(validationData)

    this.validationData = validationData;

    this.resetForm = this.resetForm.bind(this);
  }

  validateForm(event) {
    this._validateInput(event);
    this._toggleButton(event);
  }

  resetForm() {
    this._disableButton(button);
  }

  _toggleButton(event) {
    const inputs = Array.from(event.target.parentElement.elements);
    const button = event.target.parentNode.querySelector('.form__button');

    if (inputs.every((elem) => elem.checkValidity())) {
      button.removeAttribute("disabled");
      button.classList.add("popup__submit-button_active");
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove("popup__submit-button_active");
    }
  }

  _validateInput(event) {
    const errorText = event.target.nextSibling.nextSibling;

    if (event.target.validity.valueMissing && event.target.name !== 'search') {
      return errorText.textContent = 'Это обязательное поле';
    }
    if (event.target.validity.tooShort) {
      return errorText.textContent = event.target.name === 'password' ?
        'Пароль слишком короткий' :
        'Введите от 2 до 30 символов';
    }
    if (event.target.validity.typeMismatch && event.target.type === 'email') {
      return errorText.textContent = 'Введите валидный email';
    }
    return errorText.textContent = '';
  }

  setHandlers() {
    const forms = this.validationData.forms;

    this._setHandlers([
      { element: forms, event: 'input', handlerFunc: this.validateForm.bind(this) }
    ]);
  }
}