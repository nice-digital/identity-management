import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { GridContainer } from "./containers/GridContainer";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path="/" exact component={GridContainer} />
          <Route path="/user:user" exact component={GridContainer} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
