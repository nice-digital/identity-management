import { observable, computed, action } from "mobx"
import axios from 'axios'
import { getAdministration } from "mobx/lib/internal";

export class Store<T>{

    @observable
    data: Array<T> = []

    @observable
    detail: Array<T> = []

    @observable
    count: number = 0

    @action
    async getList(url: string){
        const data: Array<T> = await axios.get(url) as any
        this.data = data
    }

    @action
    async getDetail(url: string){
        const data: Array<T> = await axios.get(url) as any
        this.detail = data
    }
}