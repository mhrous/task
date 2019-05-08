import React from 'react';

import AllCar from './allCars';
import Car from './car';

const Info = ({ id }) => (id ? <Car /> : <AllCar />);

export default Info;
