import React from "react";
import {RouteHandler, Link} from "react-router";
import {Nav, Navbar} from "react-bootstrap";
import {NavItemLink} from "react-router-bootstrap";

export default class SzApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let HomeLink = <Link to="home">Scheherazade</Link>;
    return (
      <div>
        <Navbar inverse brand={HomeLink}>
        <Nav>
          <NavItemLink to="play">
            Play
          </NavItemLink>
          <NavItemLink to="about">
            About
          </NavItemLink>
        </Nav>
        </Navbar>
        <div className="container-fluid">
          <RouteHandler />
        </div>
      </div>
    );
  }
};
