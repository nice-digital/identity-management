import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { UsersPage } from "./containers/Users";

class App extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path="/" exact component={UsersPage} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
