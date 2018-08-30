import React, { Component } from "react";
import { Route, Switch } from "react-router";
import DraftBoard from "./components/DraftBoard";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Switch>
        <Route exact path="/" component={DraftBoard} />
      </Switch>
    );
  }
}
