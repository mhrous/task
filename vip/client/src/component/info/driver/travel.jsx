import React from 'react';
import { observer } from 'mobx-react';
import { Travels } from '../../../table';
import data from './data';

const Table = ({ paid }) => {
  console.log(paid);
  return <Travels travels={data.travels} />;
};

export default observer(Table);
