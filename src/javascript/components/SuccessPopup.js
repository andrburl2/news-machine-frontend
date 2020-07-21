import { Popup } from './Popup';

export class SuccessPopup extends Popup {
  constructor(popupData) {
    super(popupData);

    this.popupData = popupData;

    this.open = this.open.bind(this);
  }

  open() {
    this._open();
  }

  close() {
    this._close();
  }

  setHandlers() {
    const closeElements = this.popupData.closeElements;

    this._setHandlers([
      { element: closeElements, event: 'click', handlerFunc: this.close.bind(this) },
      { element: this.popup, event: 'click', handlerFunc: this.escClose.bind(this) },
      { element: document, event: 'keydown', handlerFunc: this.escClose.bind(this) }
    ]);
  }
}