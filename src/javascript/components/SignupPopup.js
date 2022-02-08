import { Popup } from './Popup';

export class SignupPopup extends Popup {
  constructor(popupData) {
    super(popupData);

    this.apiCallback = null;
    this.successCallback = null;

    this.popupData = popupData;
  }

  open() {
    this._open();
  }

  close() {
    this._close();
    this._resetForm();
  }

  submit(event) {
    event.preventDefault();

    this._renderLoading();
    this.apiCallback(this._getValues())
      .then(res => {
        if (res.status === 201) {
          this.close();
          this.successCallback();
        } else {
          throw new Error(res.message)
        }
      })
      .catch(err => {
        this.popup.querySelector('.popup__error-text_type_main').textContent = err.message;
      })
      .finally(() => this._renderLoading('Зарегистрироваться'));

  }

  handleCallbacks(fn1, fn2) {
    this.apiCallback = fn1;
    this.successCallback = fn2;
  }

  setHandlers() {
    const openElement = this.popupData.openElement;
    const closeElements = this.popupData.closeElements;

    this._setHandlers([
      { element: openElement, event: 'click', handlerFunc: this.open.bind(this) },
      { element: closeElements, event: 'click', handlerFunc: this.close.bind(this) },
      { element: this.popup, event: 'click', handlerFunc: this.escClose.bind(this) },
      { element: document, event: 'keydown', handlerFunc: this.escClose.bind(this) },
      { element: this.form, event: 'submit', handlerFunc: this.submit.bind(this) }
    ]);
  }
}