import React from "react";
import { GridContainer } from "./GridContainer";
import { UserStore } from "../store/User";

export const UsersPage = () => {
  const columnDefs = [
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
  const userStore = new UserStore() 
  return <GridContainer store={userStore} columnDefs={columnDefs}/>;
};
