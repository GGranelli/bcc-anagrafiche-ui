import React, { Component } from "react";
import { ROUTES } from "./common/Constants";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USERNAME");

    window.location = window.defConfigurations.url_prefix + ROUTES.LOGIN;
  }
  render() {
    return null;
  }
}

export default Logout;
