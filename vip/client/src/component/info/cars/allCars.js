import React, { useEffect } from 'react';
import AddCarModal from './addCarModal';
import CarTable from './carTable';
import data from './data';

const All = () => {
  useEffect(() => {
    data.initAll();
  });

  return (
    <div>
      <AddCarModal />
      <CarTable />
    </div>
  );
};

export default All;
