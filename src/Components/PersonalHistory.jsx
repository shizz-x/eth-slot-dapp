import React, { Component } from "react";

export default class PersonalHistory extends Component {
  componentDidMount() {
    console.log(123);
  }
  componentWillUnmount() {
    console.log(1321);
  }
  render() {
    return <div className="history_content">PersonalHistory</div>;
  }
}
