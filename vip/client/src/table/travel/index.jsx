import React, { useEffect } from 'react';
import AddTravelModel from './addTravelModal';
import TravelTable from './travelTable';
import data from './data';

const Travel = ({ travels, idDriver }) => {
  useEffect(() => {
    data.init({ travels, idDriver });
  });

  return (
    <div>
      <AddTravelModel />
      <TravelTable />
    </div>
  );
};

export default Travel;
