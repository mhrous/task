import React, { useEffect } from 'react';
import AddDriverModel from './addDriverModal';
import DriverTable from './driverTable';
import data from './data';
const Drivers = () => {
  useEffect(() => data.init());
  return (
    <div>
      <AddDriverModel />
      <DriverTable />
    </div>
  );
};

export default Drivers;
