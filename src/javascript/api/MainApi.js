export class MainApi {
  constructor(apiData) {
    this.url = apiData.url;
    this.path = apiData.path;
    this.headers = apiData.headers;

    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.logout = this.logout.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
  }

  signup([email, password, name]) {
    return fetch(`${this.url}${this.path.signup}`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
      .then(res => res.json());
  }

  signin([email, password]) {
    return fetch(`${this.url}${this.path.signin}`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json());
  }

  getUserData() {
    return fetch(`${this.url}${this.path.userData}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json());
  }

  logout() {
    return fetch(`${this.url}${this.path.logout}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json());
  }

  getArticles() {
    return fetch(`${this.url}${this.path.articles}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json());
  }

  createArticle([keyword, title, text, date, source, link, image]) {
    return fetch(`${this.url}${this.path.articles}`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image
      })
    })
      .then(res => res.json());
  }

  removeArticle(id) {
    return fetch(`${this.url}${this.path.articles}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include'
    })
      .then(res => res.json());
  }
}