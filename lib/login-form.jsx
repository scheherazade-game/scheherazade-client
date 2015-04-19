import React from "react";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";
import {Input, Button, ButtonToolbar, Alert} from "react-bootstrap";
import FlatButton from "lib/material/flat-button";
import db from "lib/db";

export default React.createClass({
  getInitialState() {
    return { email: "", password: "", error: null, type: "login" };
  },
  reset() {
    db.resetPassword({
      email: this.state.email
    }, () => {
      this.props.onDone();
    });
  },
  login() {
    db.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, (error, authData) => {
      this.setState({error, pending: false});
      !error && this.props.onDone();
    });
  },
  register() {
    if (this.state.password !== this.state.confirm) {
      this.setState({
        error: new Error("Password and confirmation do not match."),
        pending: false
      });
      return;
    }
    if (!this.state.is18) {
      this.setState({
        error: new Error("You must be 18 or older to register."),
        pending: false
      });
      return;
    }
    db.createUser({
      email: this.state.email,
      password: this.state.password
    }, (error, authData) => {
      this.setState({error, pending: !error});
      !error && db.child("users").child(authData.uid).set({
        uid: authData.uid,
        email: this.state.email,
        name: this.state.name
      }, error => {
        this.setState({error, pending: !error});
        !error && this.login();
      });
    });
  },
  setType(type) {
    this.setState({
      error: null,
      type: type
    });
    this.props.onTypeChange &&
      this.props.onTypeChange(type);
  },
  handleSubmit(ev) {
    ev.preventDefault();
    this.setState({pending: true});
    this[this.state.type]();
  },
  renderInput(props) {
    return (
        <Input {...props}
               key={props.ref}
               bsStyle={this.state.error && "error"}
               disabled={this.state.pending}
               onChange={e => {
                 this.setState({error: null, [props.ref]: e.target.value});
               }}
               onInput={e => {
                 this.setState({error: null, [props.ref]: e.target.value});
               }}>
        </Input>);
  },
  render() {
    let FormError = this.state.error ? (
        <Alert bsStyle="warning">
          <b>Error</b> {this.state.error.message}
        </Alert>
    ) :
        null;
    let isLogin = this.state.type === "login";
    let isRegister = this.state.type === "register";
    let isReset = this.state.type === "reset";
    return (
        <TransitionGroup transitionName="grow"
                         component="form"
                         onSubmit={e => this.handleSubmit(e)}>
          {FormError}
          {isRegister && this.renderInput({
            ref: "name",
            type: "text",
            label: "Name",
            placeholder: "Alex Doe"
          })}
          {this.renderInput({
            ref: "email",
            type: "email",
            label: "Email",
            help: isReset ? "We'll send you an email to this address." : "",
            placeholder: "you@somewhere.io"
          })}
          {(isLogin || isRegister) && this.renderInput({
            ref: "password",
            type: "password",
            label: "Password",
            placeholder: "supersecret"
          })}
          {isRegister && this.renderInput({
            ref: "confirm",
            type: "password",
            label: "Confirm Password",
            placeholder: "supersecret"
          })}
          {isRegister && this.renderInput({
            ref: "is18",
            type: "checkbox",
            label: "I'm 18 or older"
          })}
          <ButtonToolbar className="pull-right">
            <FlatButton onClick={e => this.setType("reset")}>
              Reset
            </FlatButton>
            <FlatButton disabled={this.state.pending}
                        onClick={e => {
                          e.preventDefault();
                          this.setType(isLogin ? "register" : "login");
                        }}>
              <span>{!isLogin ? "Sign In" : "Register" }</span>
            </FlatButton>
            <FlatButton bsStyle="primary"
                        type="submit"
                        disabled={this.state.pending}>
              Submit
            </FlatButton>
          </ButtonToolbar>
        </TransitionGroup>
    );
  }
});
