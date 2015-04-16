import React from "react";
import {Jumbotron} from "react-bootstrap";
import {ButtonLink} from "react-router-bootstrap";
import Paper from "lib/material/paper";

export default class SzHome extends React.Component {
  render() {
    return (
      <Paper zDepth={2}>
        <h1>Tell Me A Story</h1>
        <p>
          Scheherazade is an online storytelling game
          that turns roleplaying into its own MMO.
        </p>
        <ButtonLink bsStyle="primary" to="play">Play Now</ButtonLink>
      </Paper>
    );
  }
};
