import React from 'react';

import AllPartener from './allPartners';
import Partner from './partner';

const Info = ({ id }) => (id ? <Partner /> : <AllPartener />);

export default Info;
