import React, { useEffect } from 'react';
import AddDriverModel from './addDriverModal';
import DriverTable from './driverTable';
import data from './data';
const All = () => {
  useEffect(() => data.initAll());
  return (
    <div>
      <AddDriverModel />
      <DriverTable />
    </div>
  );
};

export default All;
