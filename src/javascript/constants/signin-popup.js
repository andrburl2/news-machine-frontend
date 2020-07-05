export const SIGNIN_POPUP_DATA = {
  popup: document.querySelector('.popup_type_signin'),
  openElements: [
    document.querySelector('.header__button_type_login'),
    document.querySelector('.popup__switch_target_signin'),
    document.querySelector('.popup__enter-button')
  ],
  closeElements: [
    document.querySelector('.popup__switch_target_signup'),
    document.querySelector('.popup_type_signin').querySelector('.popup__close-button')
  ],
  form: document.querySelector('.popup_type_signin').querySelector('.popup__form'),
  submit: document.querySelector('.popup_type_signin').querySelector('.popup__submit-button')
}