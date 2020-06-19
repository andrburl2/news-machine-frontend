export class MobileNav {
  constructor(header, nav, button) {
    this.header = header;
    this.nav = nav;
    this.button = button;

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.button.classList.toggle('header__mobile-button_active');
    this.header.classList.toggle('header__content_background_black');
    this.nav.classList.toggle('header__nav_active');
  };
}