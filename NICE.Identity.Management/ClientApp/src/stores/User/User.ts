import { Store } from "../CommonStore"
import { User } from "../../models/User"
import { url } from "../../constants/urls"

export class UserStore extends Store<User> {
  constructor() {
    super(url.users)
  }
  // specific methods for the User store
}
