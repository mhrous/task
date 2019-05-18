import React from 'react';
import { Contaner } from '../component';
import Information from './Information';

const HomePage = ({ match }) => (
  <Contaner match={match}>
    <Information match={match} />
  </Contaner>
);

export default HomePage;
