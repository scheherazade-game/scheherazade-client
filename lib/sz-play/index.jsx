import React from "react";
import db from "lib/db";
import ReactFireMixin from "reactfire";

export default React.createClass({
  mixins: [ReactFireMixin],
  getInitialState() {
    return { users: [] };
  },
  componentWillMount() {
    this.bindAsArray(db.child("users"), "users", err => err && console.error(err));
  },
  render() {
    let users = this.state.users;
    return (
      <div>
        Game goes here :3
        <ul>
          {users.map(u => {
              return (
                  <li key={u.email}>
                    <a href={"mailto:"+u.email}>{u.name} &lt;{u.email}&gt;</a>
                  </li>);
          })}
        </ul>
      </div>
    );
  }
});
