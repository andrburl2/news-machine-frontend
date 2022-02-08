import { BaseComponent } from './BaseComponent';

export class NewsCardList extends BaseComponent {
  constructor(newsCardListData, pageName) {
    super(newsCardListData);

    this.resultsContainer = newsCardListData.results;
    this.newsCardContainer = newsCardListData.container;
    this.button = newsCardListData.button;
    this.preloader = newsCardListData.preloader;
    this.notFound = newsCardListData.notFound;

    this.results = null;
    this.keyword = null;
    this.showed = 0;
    this.maxShowed = 0;

    this.newsCardCallback = null;
    this.searchCallback = null;
    this.apiCallback = null;

    this.pageName = pageName;

    this.clearResults = this.clearResults.bind(this);
  }

  renderSavedNews() {
    this.apiCallback()
      .then(res => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            return
          };

          this.resultsContainer.classList.remove('hidden');

          res.data.forEach(item => {
            this.newsCardContainer.appendChild(this.newsCardCallback(item, item.keyword));
          });
        }
      })
  }

  sendReq(event) {
    event.preventDefault();

    this.clearResults();

    this._toggleElement(this.preloader, true);

    this.searchCallback()
      .then(res => {
        if (res.totalResults === 0 || res.status !== 'ok') {
          throw new Error
        }

        this.results = res.articles;
        this.keyword = res.keyword;
        this.showed = 0;
        this.maxShowed = 3;

        this.renderResults();

        this._toggleElement(this.resultsContainer, true);
      })
      .catch(err => {
        this._toggleElement(this.notFound, true);
      })
      .finally(() => this._toggleElement(this.preloader, false));
  }

  renderResults() {
    for (this.showed; this.showed < this.maxShowed; this.showed++) {
      if (this.showed === this.results.length) {
        this._toggleElement(this.button, false);
        return
      }

      this.newsCardContainer.appendChild(this.newsCardCallback(this.results[this.showed], this.keyword));
    }

    this.maxShowed +=3;
  }

  clearResults() {
    while (this.newsCardContainer.lastChild) {
      this.newsCardContainer.removeChild(this.newsCardContainer.lastChild);
    }

    this._toggleElement(this.resultsContainer, false);
    this._toggleElement(this.notFound, false);
    this._toggleElement(this.button, true);
  }

  _toggleElement(element, isHidden) {
    if (isHidden) {
      element.classList.remove('hidden');
    } else {
      element.classList.add('hidden');
    }
  }

  handleCallbacks(fn1, fn2) {
    if (this.pageName === 'articles') {
      this.apiCallback = fn2;
    }
    this.newsCardCallback = fn1;
    this.searchCallback = fn2;
  }

  setHandlers() {
    this._setHandlers([
      { element: document.forms.searchForm, event: 'submit', handlerFunc: this.sendReq.bind(this) },
      { element: this.button, event: 'click', handlerFunc: this.renderResults.bind(this) }
    ]);
  }
}