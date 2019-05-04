import React, { useEffect } from 'react';
import AddTravelModel from './addTravelModal';
import TravelTable from './travelTable';
import data from './data';

const All = () => {
  useEffect(() => {
    data.initAll();
  });

  return (
    <div>
      <AddTravelModel />
      <TravelTable />
    </div>
  );
};

export default All;
