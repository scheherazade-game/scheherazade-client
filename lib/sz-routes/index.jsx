import React from "react";
import {Route, DefaultRoute, NotFoundRoute} from "react-router";
import SzApp from "lib/sz-app";
import SzHome from "lib/sz-home";
import SzNotFound from "lib/sz-not-found";
import SzAbout from "lib/sz-about";
import SzPlay from "lib/sz-play";

export default (
    <Route path="/" handler={SzApp}>
      <DefaultRoute name="home" handler={SzHome} />
      <Route name="play" handler={SzPlay} />
      <Route name="about" handler={SzAbout} />
      <NotFoundRoute handler={SzNotFound} />
    </Route>
);
