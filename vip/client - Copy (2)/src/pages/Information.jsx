import React from 'react';
import { Partner, Car, Driver } from '../component';

import { Status, Travel } from '../table';

const Information = ({ match }) => {
  const { id, TableName } = match.params;
  let Page;
  switch (TableName) {
    case 'partners':
      Page = () => <Partner id={id} />;
      break;
    case 'cars':
      Page = () => <Car id={id} />;
      break;
    case 'driver':
      Page = () => <Driver id={id} />;
      break;
    case 'driverStatus':
      Page = () => <Status />;
      break;
    case 'travels':
      Page = () => <Travel />;

      break;
    default:
      Page = () => <div> {TableName} </div>;

      break;
  }
  return <Page />;
};

export default Information;
