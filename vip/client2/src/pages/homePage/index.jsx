import React, { Component } from 'react';
import data from './data';

class Page extends Component {
  state = {};
  componentDidMount() {
    data.init({});
  }
  render() {
    return <div>Home Page</div>;
  }
}

export default Page;
