import React from "react";
import Router from "react-router";
import "lib/styles/styles.less";
import "lib/material";
import SzRoutes from "lib/sz-routes";

Router.run(SzRoutes, Router.HistoryLocation, Handler => {
  React.render(<Handler/>, document.body);
});
