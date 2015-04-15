import React from "react";
import {Input, Button, ButtonToolbar, Alert} from "react-bootstrap";
import db from "lib/db";

export default React.createClass({
  getInitialState() {
    return { email: "", password: "", error: null };
  },
  login(email, password) {
    db.authWithPassword({
      email: email,
      password: password
    }, (error, authData) => {
      this.setState({error, pending: false});
      !error && this.props.onLogin && this.props.onLogin();
    });
  },
  register(email, password) {
    db.createUser({
      email: email,
      password: password
    }, (error, authData) => {
      this.setState({error, pending: !error});
      !error && db.child("users").child(authData.uid).set({
        uid: authData.uid,
        email: email
      }, error => {
        this.setState({error, pending: !error});
        !error && this.login(email, password);
      });
    });
  },
  handleSubmit(ev, type) {
    ev.preventDefault();
    this.setState({pending: true});
    this[type](this.state.email, this.state.password);
  },
  render() {
    let FormError = this.state.error ? (
        <Alert bsStyle="warning">
          <b>Error</b> {this.state.error.message}
        </Alert>
    ) :
        null;
    return (
        <form onSubmit={e => this.handleSubmit(e, "login")}>
          {FormError}
          <Input ref="email"
                 type="email"
                 placeholder="you@domain.io"
                 bsStyle={this.state.error ? "error" : ""}
                 disabled={this.state.pending}
                 onInput={e => this.setState({error: null, email: e.target.value})} />
          <Input ref="password"
                 type="password"
                 placeholder="Password"
                 bsStyle={this.state.error ? "error" : ""}
                 disabled={this.state.pending}
                 onInput={e => this.setState({error: null, password: e.target.value})} />
          <ButtonToolbar className="pull-right">
            <Button bsStyle="link">Forgot Password?</Button>
            <Button disabled={this.state.pending}
                    onClick={e => this.handleSubmit(e, "register")}>
              Register
            </Button>
            <Button bsStyle="primary"
                    type="submit"
                    disabled={this.state.pending}>
              Sign In
            </Button>
          </ButtonToolbar>
        </form>
    );
  }
});
