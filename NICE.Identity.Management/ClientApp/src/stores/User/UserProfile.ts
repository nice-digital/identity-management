import { observable, action } from "mobx";
import axios from 'axios'
import { UserProfile, User } from "../../models/User";
import url from '../../constants/urls'

export class UserProfileStore {
  @observable
  userProfile: UserProfile = new User()

  @action
  async getUserProfile(){
      const item = await axios.get(url.userProfile) as any
      console.log(item)
      this.userProfile = item.data
  }
}