export class Info {
  constructor(infoData) {
    this.data = infoData;

    this.getName = null;
    this.getArticles = null;
  }

  renderInfo() {
    this.getArticles()
      .then(res => {
        if (res.status === 200) {
          const articles = res.data;
          this.getName()
            .then(res => {
              if (res.status === 200) {
                this.setTitle(res.name, articles);
                this.setKeywords(articles);
              } else {
                throw new Error
              }
            })
            .catch(err => console.log(err));
        } else {
          throw new Error
        }
      })
      .catch(err => console.log(err));
  }

  setTitle(name, articles) {
    this.data.infoTitle.textContent = `Добро пожаловать, ${name}.`;
    this.data.infoSubtitle.textContent =`Статей сохранено: ${articles.length}.`;
  }

  setKeywords(articles) {
    const sortedKeywords = this._sortKeywords(this._countKeywords(articles));

    if (sortedKeywords.length === 0) {
      this.data.infoText.textContent = '';
    } else if (sortedKeywords.length === 1) {
      this.data.infoText.insertAdjacentHTML('beforeEnd', `По ключевому слову: <span class='info__keywords'>${sortedKeywords[0][0]}</span>`);
    } else if (sortedKeywords.length === 2) {
      this.data.infoText.insertAdjacentHTML('beforeEnd', `По ключевым словам: <span class='info__keywords'>${sortedKeywords[0][0]}</span>
      и <span class='info__keywords'>${sortedKeywords[1][0]}</span>`);
    } else if (sortedKeywords.length === 3) {
      this.data.infoText.insertAdjacentHTML('beforeEnd', `По ключевым словам: <span class='info__keywords'>${sortedKeywords[0][0]}</span>,
      <span class='info__keywords'>${sortedKeywords[1][0]}</span> и <span class='info__keywords'>${sortedKeywords[2][0]}</span>`);
    } else {
      this.data.infoText.insertAdjacentHTML('beforeEnd', `По ключевым словам: <span class='info__keywords'>${sortedKeywords[0][0]}</span>,
      <span class='info__keywords'>${sortedKeywords[1][0]}</span> и <span class='info__keywords'>${sortedKeywords[2][0]}
      </span> и <span class='info__keywords'>${sortedKeywords.length - 3} другим</span>`);
    }
  }

  _countKeywords(articles) {
    const keywords = {};

    articles.forEach(article => {
      if (keywords[article.keyword]) {
        keywords[article.keyword] += 1;
      } else {
        keywords[article.keyword] = 1;
      }
    });

    return Object.entries(keywords);
  }

  _sortKeywords(keywords) {
    return keywords.sort((a, b) => b[1] - a[1]);
  }

  handleCallbacks(fn1, fn2) {
    this.getName = fn1;
    this.getArticles = fn2;
  }
}