import React, { useEffect } from 'react';
import AddCarModal from './addCarModal';
import CarTable from './carTable';
import data from './data';

const Cars = () => {
  useEffect(() => {
    data.init();
  });

  return (
    <div>
      <AddCarModal />
      <CarTable />
    </div>
  );
};

export default Cars;
