import React, { Component } from "react";
import auth from "../sevices/authService";
class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
