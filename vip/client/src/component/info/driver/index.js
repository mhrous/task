import React from 'react';

import AllDriver from './allDriver';
import Driver from './driver';

const Info = ({ id }) => (id ? <Driver /> : <AllDriver />);

export default Info;
