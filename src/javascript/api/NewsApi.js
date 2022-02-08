import { getDate } from '../utils/getDate';

export class NewsApi {
  constructor(apiData) {
    this.url = apiData.url;
    this.endpoint = apiData.endpoint;
    this.language = apiData.language;
    this.pageSize = apiData.pageSize;
    this.apiKey = apiData.apiKey;

    this.getNews = this.getNews.bind(this);
  }

  async getNews(keyword) {
    const res = await fetch(
      `${this.url}` +
      `${this.endpoint}?` +
      `q=${keyword}&` +
      `from=${getDate(7)}&` +
      `to=${getDate(0)}&` +
      `language=${this.language}&` +
      `pageSize=${this.pageSize}&` +
      `apiKey=${this.apiKey}`
    );

    const res_json = await res.json();
    res_json.keyword = keyword;

    return res_json;
  }
}