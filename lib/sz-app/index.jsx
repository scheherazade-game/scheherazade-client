import React from "react";
import TransitionGroup from "react/lib/ReactCSSTransitionGroup";
import ReactFireMixin from "reactfire";
import {RouteHandler, Link} from "react-router";
import {
  CollapsableNav,
  DropdownButton,
  MenuItem,
  Modal,
  ModalTrigger,
  Nav,
  Navbar,
  NavItem
} from "react-bootstrap";
import {NavItemLink} from "react-router-bootstrap";
import db from "lib/db";
import LoginForm from "lib/login-form";

import "./styles.less";

export default React.createClass({
  mixins: [ReactFireMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() {
    return {user: null};
  },
  setUser(authData) {
    if (this.firebaseRefs.user) { this.unbind("user"); }
    if (authData) {
      this.bindAsObject(db.child("users").child(authData.uid), "user");
    } else {
      this.setState({user: null});
    }
  },
  componentWillMount() { db.onAuth(this.setUser); },
  componentWillUnmount() { db.offAuth(this.setUser); },
  getModalTitle() {
    switch (this.state.loginType) {
      case "register": return "Register";
      case "reset": return "Reset Password";
      case "login":
      default:
      return "Sign In";
    }
  },
  render() {
    let LoginModal = !this.state.user && (
        <Modal ref="modal" title={this.getModalTitle()}>
          <div className="modal-body">
            <LoginForm onTypeChange={type => this.setState({loginType: type})}
                       onDone={() => {
                         this.refs.modal &&
                           this.refs.modal.props.onRequestHide();
                       }}/>
          </div>
          <div className="modal-footer"></div>
        </Modal>
    );
    let UserNavItem = this.state.user ?
          <DropdownButton title={this.state.user.email}>
            <MenuItem>Profile</MenuItem>
            <MenuItem divider />
            <MenuItem onClick={e => {e.preventDefault(); db.unauth();}}>
              Sign Out
            </MenuItem>
          </DropdownButton> :
          <ModalTrigger modal={LoginModal}>
            <NavItem onClick={e => {
              e.preventDefault();
              this.setState({loginType: "login"});
            }}>Sign In</NavItem>
          </ModalTrigger>;
    return (
      <div className="sz-app">
        <Navbar inverse brand={HomeLink} toggleNavKey={0}>
          <CollapsableNav eventKey={0}>
            <Nav navbar right>
              <NavItemLink to="play">
                Play
              </NavItemLink>
              <NavItemLink to="about">
                About
              </NavItemLink>
              {UserNavItem}
            </Nav>
          </CollapsableNav>
        </Navbar>
        <TransitionGroup transitionName="fade"
                         component="div"
                         className="container-fluid">
          <RouteHandler key={this.context.router.getCurrentPath()}/>
        </TransitionGroup>
      </div>
    );
  }
});
