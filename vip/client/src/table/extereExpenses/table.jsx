import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

const columns = [
  {
    title: 'التاريخ',
    dataIndex: 'date',
    key: 'date',
    render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>
  },
  {
    title: 'النوع ',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'القيمة',
    dataIndex: 'value',
    key: 'value'
  },
  {
    title: 'القيمة',
    dataIndex: 'total',
    key: 'total'
  }
];
const ExtereExpensesTable = ({ expenses }) => (
  <Table
    columns={columns}
    dataSource={expenses}
    pagination={false}
    size="middle"
    onChange={(pagination, filters, sorter) => {}}
    rowKey="_id"
  />
);

export default ExtereExpensesTable;
