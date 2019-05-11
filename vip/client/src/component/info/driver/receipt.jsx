import React from 'react';
import { observer } from 'mobx-react';
import { Receipt } from '../../../table';
import data from './data';

const Table = () => <Receipt receipt={data.receipt} />;

export default observer(Table);
