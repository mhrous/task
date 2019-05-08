import React, { useEffect } from 'react';
import AddTravelModel from './addTravelModal';
import TravelTable from './travelTable';
import data from './data';

const Travel = ({ driverId, month }) => {
  useEffect(() => {
    data.initAll({ driverId, month });
  });

  return (
    <div>
      <AddTravelModel />
      <TravelTable />
    </div>
  );
};

export default Travel;
