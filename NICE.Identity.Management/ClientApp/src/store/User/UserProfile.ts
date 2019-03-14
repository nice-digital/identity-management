import { observable, action } from "mobx";
import axios from 'axios'
import { UserProfile, User } from "../../models/User";
import url from '../../constants/urls'

export class UserProfileStore {
  @observable
  userProfile: UserProfile = new User()

  @action
  async getUserProfile(){
      this.userProfile = await axios.get(url.userProfile) as any
  }
}
