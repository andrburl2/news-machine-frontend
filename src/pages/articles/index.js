import './index.css';

import { MobileNav } from '../../javascript/mobileNav';

const mobileNav = new MobileNav(document.querySelector('.header__content'), document.querySelector('.header__nav'), document.querySelector('.header__mobile-button'));

mobileNav.button.addEventListener('click', mobileNav.toggle);