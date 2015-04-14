import React from "react";
import Router from "react-router";
import "bootstrap/less/bootstrap.less";
import "lib/styles/variables.less";
import SzRoutes from "lib/sz-routes";

Router.run(SzRoutes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.body);
});
