import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { SignInPage, HomePage } from './pages';

class App extends Component {
  componentWillMount() {
    return;
  }
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/signIn" component={SignInPage} />

          <Route exact path="/:TableName" component={HomePage} />
          <Route exact path="/:TableName/:id" component={HomePage} />

          <Route exact path="/" component={() => <Redirect to="travels" />} />
        </Router>
      </div>
    );
  }
}

export default App;
