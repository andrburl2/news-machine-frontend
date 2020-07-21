import { BaseComponent } from './BaseComponent';

export class Search extends BaseComponent {
  constructor(searchData) {
    super(searchData);

    this.form = searchData.form;

    this.apiCallback = null;

    this.submit = this.submit.bind(this);
  }

  submit() {
    const keyword = this.form.search.value;

    return this.apiCallback(keyword)
  }

  handleCallback(fn) {
    this.apiCallback = fn;
  }
}