export const SIGNUP_POPUP_DATA = {
  popup: document.querySelector('.popup_type_signup'),
  openElement: document.querySelector('.popup__switch_target_signup'),
  closeElements: [
    document.querySelector('.popup__switch_target_signin'),
    document.querySelector('.popup_type_signup').querySelector('.popup__close-button')
  ],
  form: document.querySelector('.popup_type_signup').querySelector('.popup__form'),
  submit: document.querySelector('.popup_type_signup').querySelector('.popup__submit-button')
}