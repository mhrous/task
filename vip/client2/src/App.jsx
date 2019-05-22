import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { SignInPage, HomePage, SettingsPage } from './pages';

const App = () => (
  <div>
    <Router>
      <Route exact path="/signIn" component={SignInPage} />
      <Route exact path="/settings" component={SettingsPage} />
      <Route exact path="/info/:TableName" component={HomePage} />
      <Route exact path="/info/:TableName/:id" component={HomePage} />
      <Route exact path="/" component={() => <Redirect to="info/travels" />} />
    </Router>
  </div>
);

export default App;
