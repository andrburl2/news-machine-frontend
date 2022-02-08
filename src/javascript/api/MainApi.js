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

  async signup([email, password, name]) {
    const res = await fetch(`${this.url}${this.path.signup}`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name
      })
    });
    return await res.json();
  }

  async signin([email, password]) {
    const res = await fetch(`${this.url}${this.path.signin}`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });
    return await res.json();
  }

  async getUserData() {
    const res = await fetch(`${this.url}${this.path.userData}`, {
      method: 'GET',
      credentials: 'include'
    });
    return await res.json();
  }

  async logout() {
    const res = await fetch(`${this.url}${this.path.logout}`, {
      method: 'POST',
      credentials: 'include'
    });
    return await res.json();
  }

  async getArticles() {
    const res = await fetch(`${this.url}${this.path.articles}`, {
      method: 'GET',
      credentials: 'include'
    });
    return await res.json();
  }

  async createArticle([keyword, title, text, date, source, link, image]) {
    const res = await fetch(`${this.url}${this.path.articles}`, {
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
    });
    return await res.json();
  }

  async removeArticle(id) {
    const res = await fetch(`${this.url}${this.path.articles}/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include'
    });
    return await res.json();
  }
}