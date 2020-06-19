export class Popup {
  constructor(popup, modileButton) {
    this.popup = popup;
    this.modileButton = modileButton;
    this.closeButton = popup.querySelector('.popup__close-button');

    this.popupToggle = this.popupToggle.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);
  }

  popupToggle() {
    this.popup.classList.toggle('hidden');
    this.modileButton.classList.toggle('hidden');
  }

  addEventListeners(buttonArray) {
    buttonArray.forEach(el => {
      el.addEventListener('click', this.popupToggle);
    });
  }
}