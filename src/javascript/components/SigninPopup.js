import { Popup } from './Popup';

export class SigninPopup extends Popup {
  constructor(popupData) {
    super(popupData);

    this.apiLoginCallback = null;
    this.headerRenderCallback = null;
    this.headerMobileNavCallback = null;

    this.popupData = popupData;
  }

  open() {
    this.headerMobileNavCallback();
    this._open();
  }

  close() {
    this._close();
    this._resetForm();
  }

  submit(event) {
    event.preventDefault();

    this._renderLoading();
    this.apiLoginCallback(this._getValues())
      .then(res => {
        if (res.status === 200) {
          this.headerRenderCallback();
          this.close();
        } else {
          throw new Error(res.message)
        }
      })
      .catch(err => {
        this.popup.querySelector('.popup__error-text_type_main').textContent = err.message;
      })
      .finally(() => this._renderLoading('Войти'));

  }

  handleCallbacks(fn1, fn2, fn3) {
    this.apiLoginCallback = fn1;
    this.headerRenderCallback = fn2;
    this.headerMobileNavCallback = fn3;
  }

  setHandlers() {
    const openElements = this.popupData.openElements;
    const closeElements = this.popupData.closeElements;

    this._setHandlers([
      { element: openElements, event: 'click', handlerFunc: this.open.bind(this) },
      { element: closeElements, event: 'click', handlerFunc: this.close.bind(this) },
      { element: this.popup, event: 'click', handlerFunc: this.escClose.bind(this) },
      { element: document, event: 'keydown', handlerFunc: this.escClose.bind(this) },
      { element: this.form, event: 'submit', handlerFunc: this.submit.bind(this) }
    ]);
  }
}