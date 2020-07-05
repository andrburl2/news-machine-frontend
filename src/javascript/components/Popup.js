import { BaseComponent } from './BaseComponent';

export class Popup extends BaseComponent {
  constructor(popupData) {
    super(popupData);

    this.popup = popupData.popup;
    this.form = popupData.form;
    this.submitButton = popupData.submit;
  }

  _open() {
    this.popup.classList.remove('hidden');
  }

  _close() {
    this.popup.classList.add('hidden');
  }

  _resetForm() {
    this.submitButton.setAttribute("disabled", true);
    this.submitButton.classList.remove("popup__submit-button_active");

    this.popup.querySelectorAll('.popup__error-text').forEach(el=> {
      el.textContent = '';
    });
    this.form.reset();
  }

  _getValues() {
    const result = [];

    this.form.elements.forEach(el => {
      if (el.type === 'submit') {
        return
      }

      result.push(el.value);
    });

    return result
  }

  _renderLoading(isLoading, text) {
    if (isLoading) {
      this.submitButton.textContent = "Загрузка...";
    } else {
      this.submitButton.textContent = text;
    }
  }

  escClose() {
    if (event.target.classList.contains('popup') || event.key === 'Escape') {
      this.close();
    }
  }
}