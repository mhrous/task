import React from 'react';
import { observer } from 'mobx-react';
import { Cars } from '../../../table';
import data from './data';

const Table = () => {
  return (
    <Cars
      cars={data.cars}
      add={data.add.bind(data)}
      _delete={data._delete.bind(data)}
      put={data.put.bind(data)}
    />
  );
};

export default observer(Table);
