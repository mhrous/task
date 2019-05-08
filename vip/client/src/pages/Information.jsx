import React from 'react';

import { CarPage, PartnerPage, DriverPage } from '../component';

import { Status, Travels, Partners, Drivers, Cars } from '../table';

const Information = ({ match }) => {
  const { id, TableName } = match.params;
  let Page;
  switch (TableName) {
    case 'partners':
      Page = () => (id ? <PartnerPage id={id} /> : <Partners />);
      break;
    case 'cars':
      Page = () => (id ? <CarPage id={id} /> : <Cars />);
      break;
    case 'driver':
      Page = () => (id ? <DriverPage id={id} /> : <Drivers />);
      break;
    case 'driverStatus':
      Page = () => <Status />;
      break;
    case 'travels':
      Page = () => <Travels />;

      break;
    default:
      Page = () => <div> {TableName} </div>;

      break;
  }
  return <Page />;
};

export default Information;
