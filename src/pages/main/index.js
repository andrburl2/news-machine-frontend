import './index.css';

import { SigninPopup } from '../../javascript/signinPopup';
import { SignupPopup } from '../../javascript/signupPopup';
import { MobileNav } from '../../javascript/mobileNav';

const signinPopup = new SigninPopup(document.querySelector('.popup_type_signin'), document.querySelector('.header__mobile-button'));
const signupPopup = new SignupPopup(document.querySelector('.popup_type_signup'), document.querySelector('.header__mobile-button'));

const mobileNav = new MobileNav(document.querySelector('.header__content'), document.querySelector('.header__nav'), document.querySelector('.header__mobile-button'));

signinPopup.addEventListeners([document.querySelector('.header__button'), signinPopup.closeButton, signinPopup.popup.querySelector('.popup__switch-button'), signupPopup.popup.querySelector('.popup__switch-button')]);
signupPopup.addEventListeners([signupPopup.closeButton, signinPopup.popup.querySelector('.popup__switch-button'), signupPopup.popup.querySelector('.popup__switch-button')]);

mobileNav.button.addEventListener('click', mobileNav.toggle);
mobileNav.nav.querySelector('.header__button').addEventListener('click', mobileNav.toggle);