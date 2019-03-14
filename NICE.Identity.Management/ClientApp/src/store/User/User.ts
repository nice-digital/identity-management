import { Store } from "../";
import { User } from "../../models/User";
import { url } from "../../constants/urls";

export class UserStore extends Store<User> {
  constructor() {
    super();
    this.url = url.users
  }
  // specific methods for the User store
}
