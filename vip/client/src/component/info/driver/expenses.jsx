import React from 'react';
import { observer } from 'mobx-react';
import { ExtereExpenses } from '../../../table';
import data from './data';

const Table = () => <ExtereExpenses expenses={data.extraExpensesObj} />;

export default observer(Table);
