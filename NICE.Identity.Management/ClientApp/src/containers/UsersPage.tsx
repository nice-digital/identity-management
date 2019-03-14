import React, { Component } from "react";
import { observer } from "mobx-react";
import { GridContainer } from "./GridContainer";
import { UserStore, UserProfileStore } from "../store/User";

@observer
export class UsersPage extends Component {
  userProfileStore = new UserProfileStore();
  userStore = new UserStore();
  columnDefs = [
    {
      headerName: "First Name",
      field: "firstName"
    },
    {
      headerName: "Last Name",
      field: "lastName"
    },
    {
      headerName: "Email Address",
      field: "email"
    }
  ];

  constructor(props: any) {
    super(props);
    this.userProfileStore.getUserProfile();
  }
  render() {
    const loggedUser = this.userProfileStore.userProfile;
    return loggedUser.roles &&
      loggedUser.roles.find((item: string) => item === "administrator") ? (
      <GridContainer store={this.userStore} columnDefs={this.columnDefs} />
    ) : (
      <div>no role</div>
    );
  }
}
