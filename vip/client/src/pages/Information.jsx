import React from 'react';
import { Redirect } from 'react-router-dom';

import { Car, PartnerPage, DriverPage } from '../component';

import { Status, Travels, Partners, Drivers } from '../table';

const Information = ({ match }) => {
  const { id, TableName } = match.params;
  let Page;
  switch (TableName) {
    case 'partners':
      Page = () => (id ? <PartnerPage id={id} /> : <Partners />);
      break;
    case 'cars':
      Page = () => <Car id={id} />;
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
