import React from 'react';
import { observer } from 'mobx-react';
import { Travels } from '../../../table';
import data from './data';

const Table = () => {
  return (
    <Travels
      travels={data.travels}
      add={data.add.bind(data)}
      _delete={data._delete.bind(data)}
      put={data.put.bind(data)}
    />
  );
};

export default observer(Table);
