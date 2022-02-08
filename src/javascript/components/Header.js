import { BaseComponent } from './BaseComponent';
import { redirect } from '../utils/redirect';

export class Header extends BaseComponent {
  constructor(headerData, pageName) {
    super(headerData);

    this.headerData = headerData;
    this.pageName = pageName;

    this.userName = null;
    this.apiUserCallback = null;
    this.apiLogoutCallback = null;
    this.clearResults = null;

    this.render = this.render.bind(this);
    this.closeMobileNav = this.closeMobileNav.bind(this);
  }

  toggleMobileNav() {
    if (this.headerData.headerButton.classList.contains('header__mobile-button_active')) {
      this.closeMobileNav();
    } else {
      this._openMobileNav();
    }
  }

  logout() {
    this.apiLogoutCallback()
      .then(res => {
        if (res.status === 200) {
          if (this.pageName === 'articles') {
            redirect('../');
          }

          this.userName = null;
          this.render();
        } else {
          throw new Error
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    this.apiUserCallback()
      .then(res => {
        if (res.status === 200) {
          this.userName = res.name;

          if (this.pageName === 'main') {
            this._toggleHeader();
            this.clearResults();
            return
          }

          if (this.pageName === 'articles') {
            this.headerData.logoutButton.textContent = this.userName;
            return
          }
        } else {
          throw new Error(res.message);
        }
      })
      .catch(err => {
        if (this.pageName === 'main') {
          this._toggleHeader();
        }
        if (this.pageName === 'articles') {
          redirect('../');
        }
      })
  }

  closeMobileNav() {
    const { headerContent, headerNav, headerButton } = this.headerData;

    headerContent.classList.remove('header__content_background_black');
    headerNav.classList.remove('header__nav_active');
    headerButton.classList.remove('header__mobile-button_active');
  }

  _openMobileNav() {
    const { headerContent, headerNav, headerButton } = this.headerData;

    headerContent.classList.add('header__content_background_black');
    headerNav.classList.add('header__nav_active');
    headerButton.classList.add('header__mobile-button_active');
  }

  _toggleHeader() {
    if (this.userName) {
      this.headerData.link.classList.remove('hidden');
      this.headerData.loginButton.classList.add('hidden');
      this.headerData.logoutButton.classList.remove('hidden');
      this.headerData.logoutButton.textContent = this.userName;
    } else {
      this.headerData.link.classList.add('hidden');
      this.headerData.loginButton.classList.remove('hidden');
      this.headerData.logoutButton.classList.add('hidden');
      this.headerData.logoutButton.textContent = '';
    }
  }

  handleCallbacks(fn1, fn2, fn3) {
    this.apiUserCallback = fn1;
    this.apiLogoutCallback = fn2;
    this.clearResults = fn3;
  }

  setHandlers() {
    this._setHandlers([
      { element: this.headerData.headerButton, event: 'click', handlerFunc: this.toggleMobileNav.bind(this) },
      { element: this.headerData.logoutButton, event: 'click', handlerFunc: this.logout.bind(this) }
    ]);
  }
}