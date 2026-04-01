import React, { Component } from "react";

class LifecycleLogger extends Component {
  componentDidMount() {
    console.log("LifecycleLogger mounted");
  }

  componentWillUnmount() {
    console.log("LifecycleLogger unmounted");
  }

  render() {
    return null;
  }
}

export default LifecycleLogger;
