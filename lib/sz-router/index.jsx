import React from "react";
import {Route, RouteHandler} from "react-router";
import SzApp from "lib/sz-app";

export default class SzRoutes extends React.Component {
  render() {
      return (
          <Route handler={SzApp}>
          </Route>
      );
  }
};
