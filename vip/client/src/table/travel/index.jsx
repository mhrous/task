import React, { useEffect } from 'react';
import AddTravelModel from './addTravelModal';
import TravelTable from './travelTable';
import data from './data';

const Travel = ({ travels, add, put, _delete }) => {
  useEffect(() => {
    data.init({ travels, add, put, _delete });
  });

  return (
    <div>
      <AddTravelModel />
      <TravelTable />
    </div>
  );
};

export default Travel;
