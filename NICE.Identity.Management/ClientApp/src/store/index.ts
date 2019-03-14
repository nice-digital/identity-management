import { observable, action } from "mobx";
import axios from "axios";
export * from "./User";

export { observable, action };
export class Store<T> {
  constructor() {}
  url?: string;
  @observable
  data: Array<T> = [];

  @observable
  detail?: T = undefined;

  @observable
  count: number = 0;

  @action
  async getList() {
    if (!this.url) return;
    const data: any = (await axios.get(this.url)) as any;
    this.data = data.data;
  }

  @action
  async getDetail(item: string) {
    const data = (await axios.get(`${this.url}/${item}`)) as any;
    this.detail = data;
  }
}
