import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { UsersPage } from "./containers/UsersPage";

class App extends Component {
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
