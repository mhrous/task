import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import data from './data';
import User from '../../User';

class Page extends Component {
  componentDidMount() {
    data.init({});
  }
  render() {
    return User.logIn ? <Redirect to="/info/travels" /> : <div>singIn</div>;
  }
}

export default Page;
