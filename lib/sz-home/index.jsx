import React from "react";
import {Jumbotron} from "react-bootstrap";
import {ButtonLink} from "react-router-bootstrap";
import Paper from "lib/material/paper";

export default class SzHome extends React.Component {
  render() {
    return (
        <div>
            <h1>Tell Me A Story</h1>
            <h4>
              Scheherazade is an online storytelling game
              that turns roleplaying into its own MMO.
            </h4>
            <ButtonLink bsStyle="primary" to="play">Play Now</ButtonLink>
        </div>
    );
  }
};
