import React from "react";
import ReactFireMixin from "reactfire";
import {RouteHandler, Link} from "react-router";
import {
  Nav,
  Navbar,
  NavItem,
  Modal,
  ModalTrigger,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import {NavItemLink} from "react-router-bootstrap";
import db from "lib/db";
import LoginForm from "lib/login-form";

export default React.createClass({
  mixins: [ReactFireMixin],
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
  render() {
    let HomeLink = <Link to="home">Scheherazade</Link>;
    let LoginModal = (
        <Modal ref="modal" title="Sign In">
          <div className="modal-body">
            <LoginForm onLogin={() => this.refs.modal.props.onRequestHide()}/>
          </div>
          <div className="modal-footer"></div>
        </Modal>
    );
    let UserNavItem = this.state.user ?
          <DropdownButton title={this.state.user.email}>
            <MenuItem>Profile</MenuItem>
            <MenuItem divider />
            <MenuItem onClick={() => db.unauth()}>
              Sign Out
            </MenuItem>
          </DropdownButton> :
          <ModalTrigger modal={LoginModal}>
            <NavItem>Sign In</NavItem>
          </ModalTrigger>;
    return (
      <div>
        <Navbar inverse brand={HomeLink}>
        <Nav className="pull-right">
          <NavItemLink to="play">
            Play
          </NavItemLink>
          <NavItemLink to="about">
            About
          </NavItemLink>
          {UserNavItem}
        </Nav>
        </Navbar>
        <div className="container-fluid">
          <RouteHandler />
        </div>
      </div>
    );
  }
});
