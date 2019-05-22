import React from 'react';
import { Contaner } from '../component';
import Information from './info';

const HomePage = ({ match }) => (
  <Contaner match={match}>
    <Information match={match} />
  </Contaner>
);

export default HomePage;
