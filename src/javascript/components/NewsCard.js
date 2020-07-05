import { BaseComponent } from './BaseComponent';
import { formatDate } from '../utils/formatDate';

export class NewsCard extends BaseComponent {
  constructor(pageName) {
    super();

    this.getArticles = null;
    this.saveArticle = null;
    this.deleteArticle = null;

    this.pageName = pageName;

    this.create = this.create.bind(this);
    this._checkMatch = this._checkMatch.bind(this);
  }

  create(articleData, keyword) {
    const template = `
    <div class="article">
      <p class="article__keyword ${this.pageName === 'main' ? 'hidden' : ''}"></p>

      <div class="article__button-container">
        <p class="article__explanation">${this.pageName === 'main' ? 'Войдите, чтобы сохранять статьи' : 'Убрать из сохранённых'}</p>
        <button class="article__button ${this.pageName === 'main' ? 'article__button_type_save' : 'article__button_type_trash'}"></button>
      </div>

      <a class="article__link" href="" target="_blank">
        <img class="article__img" src="" alt="Обложка статьи">

        <div class="article__text-column">
          <p class="article__date"></p>
          <h3 class="article__title"></h3>
          <p class="article__text"></p>
          <p class="article__author"></p>
        </div>
      </a>
    </div>
    `.trim();

    let createNewTag = document.createElement("div");
    createNewTag.insertAdjacentHTML("beforeend", template);
    const element = createNewTag.firstChild;

    this._setEventListener(element);
    this._setContent(element, articleData, keyword);
    if (this.pageName === 'main') {
      this._renderIcon(element, articleData);
    }

    return element;
  }

  removeArticle() {
    const article = event.target.closest('.article');

    this.deleteArticle(article.id)
      .then(res => {
        if (res.status === 200) {
          article.remove();
        } else {
          throw new Error
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  sendReq() {
    if (!event.target.classList.contains('article__button_logged')) {
      return
    }

    let button = event.target;
    let article = event.target.parentNode.parentNode;

    if (event.target.classList.contains('article__button_active')) {
      this.deleteArticle(article.id)
        .then(res => {
          if (res.status === 200) {
            this._toggleIcon(button);
            article.id = '';
          } else {
            throw new Error
          }
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      this.saveArticle(this._getData(article))
        .then(res => {
          this._toggleIcon(button);
          if (res.status === 201) {
            article.id = res.id;
          } else {
            throw new Error
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  handleCallbacks(fn1, fn2, fn3) {
    this.getArticles = fn1;
    this.saveArticle = fn2;
    this.deleteArticle = fn3;
  }

  _toggleIcon(element) {
    element.classList.toggle('article__button_active');
  }

  _setEventListener(element) {
    if (this.pageName === 'main') {
      element.querySelector('.article__button').addEventListener('click', this.sendReq.bind(this));
    } else {
      element.querySelector('.article__button').addEventListener('click', this.removeArticle.bind(this));
    }
  }

  _renderIcon(element, articleData) {
    if (!this._isLogged()) {
      element.querySelector('.article__button-container').classList.add('article__button-container_logged');
      element.querySelector('.article__button').classList.add('article__button_logged');

      this._checkMatch(articleData)
        .then(res => {
          if (res.isSaved) {
            element.id = res.data.find(item => articleData.url === item.link)._id;
            element.querySelector('.article__button').classList.add('article__button_active');
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  _checkMatch(articleData) {
    return this.getArticles()
      .then(res => {
        if (res.status === 200) {
          const urlSet = new Set([]);
          res.data.forEach(item => {
            urlSet.add(item.link);
          });

          return { data: res.data, isSaved: urlSet.has(articleData.url) }
        } else {
          throw new Error
        }
      })
  }

  _isLogged() {
    return (document.querySelector('.header__button_type_logout').textContent === '')
  }

  _getData(element) {
    const keyword = element.querySelector('.article__keyword').textContent;
    const title = element.querySelector('.article__title').textContent;
    const text = element.querySelector('.article__text').textContent;
    const date = element.querySelector('.article__date').textContent;
    const source = element.querySelector('.article__author').textContent;
    const link = element.querySelector('.article__link').href;;
    const image = element.querySelector('.article__img').src;

    return [ keyword, title, text, date, source, link, image ];
  }

  _setContent(element, data, keyword) {
    element.querySelector('.article__link').setAttribute('href', this.pageName === 'main' ? data.url : data.link);

    if (this.pageName === 'articles') {
      element.id = data._id;
      element.querySelector('.article__img').setAttribute('src', data.image);
    } else {
      element.querySelector('.article__img').setAttribute('src', data.urlToImage ? data.urlToImage : 'https://im0-tub-ru.yandex.net/i?id=45e0a649cf8164d6bf243128d1afc86e-l&n=13');
    }

    element.querySelector('.article__keyword').textContent = keyword;
    element.querySelector('.article__date').textContent = this.pageName === 'main' ? formatDate(data.publishedAt) : data.date;
    element.querySelector('.article__title').textContent = data.title;
    element.querySelector('.article__text').textContent = this.pageName === 'main' ? data.description : data.text;
    element.querySelector('.article__author').textContent = this.pageName === 'main' ? data.source.name : data.source;
  }
}