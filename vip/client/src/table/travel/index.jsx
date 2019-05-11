import React, { useEffect } from 'react';
import AddTravelModel from './addTravelModal';
import TravelTable from './travelTable';
import data from './data';

const Travel = ({ travels }) => {
  useEffect(() => {
    data.init({ travels });
  });

  return (
    <div>
      <AddTravelModel />
      <TravelTable />
    </div>
  );
};

export default Travel;
