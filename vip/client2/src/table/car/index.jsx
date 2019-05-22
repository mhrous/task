import React, { useEffect } from 'react';
import AddCarModal from './addCarModal';
import CarTable from './carTable';
import data from './data';

const Cars = ({ cars, add, put, _delete }) => {
  useEffect(() => {
    data.init({ cars, add, put, _delete });
  });

  return (
    <div>
      <AddCarModal />
      <CarTable />
    </div>
  );
};

export default Cars;
