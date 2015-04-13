import React from "react";
import {Jumbotron} from "react-bootstrap";
import {ButtonLink} from "react-router-bootstrap";

export default class SzHome extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>Tell Me A Story</h1>
        <p>
          Scheherazade is an online storytelling game
          that turns roleplaying into its own MMO.
        </p>
        <ButtonLink bsStyle="primary" to="play">Play Now!</ButtonLink>
      </Jumbotron>
    );
  }
};
