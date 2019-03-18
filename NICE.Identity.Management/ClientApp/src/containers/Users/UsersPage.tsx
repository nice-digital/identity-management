import React, { Component } from "react"
import { observer } from "mobx-react"
import Loader from "react-loader"
import { GridContainer } from "../GridContainer"
import { UserStore, UserProfileStore } from "../../stores/User"

@observer
export class UsersPage extends Component {
  constructor(props: any) {
    super(props)
    this.userProfileStore.getUserProfile()
  }
  userProfileStore = new UserProfileStore()
  userStore = new UserStore()
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
  ]

  isAllowed(){
    const loggedUser = this.userProfileStore.userProfile
    return loggedUser.roles && loggedUser.roles.length && 
    loggedUser.roles.find((item: string) => item === "administrator")
  }
  
  render() {
    return this.isAllowed() ? (
      <GridContainer store={this.userStore} columnDefs={this.columnDefs} />
    ) : (
      <Loader loaded={false}/>
    )
  }
}
