import React from "react";
import {Button} from "react-bootstrap";

export default React.createClass({
  displayName: "FlatButton",
  render() {
    return <Button {...this.props} className="btn-flat" />;
  }
});
