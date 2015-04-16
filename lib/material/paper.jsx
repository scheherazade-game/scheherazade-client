import React from "react";
import classNames from "classnames";
import {Panel} from "react-bootstrap";

export default React.createClass({
  displayName: "Paper",
  propTypes: {
    zDepth: React.PropTypes.number,
    circle: React.PropTypes.bool,
    rounded: React.PropTypes.bool
  },
  getDefaultProps() {
    return { zDepth: 0, rounded: true };
  },
  render() {
    let classes = classNames({
      "panel-circle": this.props.circle,
      "panel-rounded": this.props.rounded
    }, this.props.zDepth && ("panel-z-depth-"+this.props.zDepth));
    return (
      <Panel {...this.props} className={classes}>
        {this.props.children}
      </Panel>
    );
  }
});
