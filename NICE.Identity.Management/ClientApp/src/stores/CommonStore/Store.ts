import { observable, action } from "mobx";
import axios from "axios";

export { observable, action };

export class Store<T> {
  constructor(uri: string) {
    this.url = uri;
  }
  url: string;

  @observable
  data: Array<T> = [];

  @observable
  detail?: T = undefined;

  @observable
  count: number = 0;

  @observable
  isLoading: boolean = false;

  @observable
  isLoaded: boolean = false;

  @observable
  isError: boolean = false;

  @observable
  error?: Error = undefined;

  @action
  async getList() {
    if (!this.url) return;
    try {
      this.isLoading = true;
      const res: any = await axios.get(this.url);
      this.data = res.data;
      this.detail = res.data;
      this.isLoading = false;
      this.isError = false;
      this.isLoaded = true;
    } catch (e) {
      this.isError = true;
      this.error = e;
    }
  }

  @action
  async getDetail(item: string) {
    try {
      this.isLoading = true;
      const res = await axios.get(`${this.url}/${item}`);
      this.detail = res.data;
      this.isLoading = false;
      this.isError = false;
      this.isLoaded = true;
    } catch (e) {
      this.isError = true;
      this.error = e;
    }
  }
}
