import React, { Component } from "react";

class Checkbox extends Component {
  render() {
    return (
      <input
        onChange={() => this.props.toggleCheckbox(this.props.item)}
        type="checkbox"
        disabled={this.props.disable}
      />
    );
  }
}

export default Checkbox;
