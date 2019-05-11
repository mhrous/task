import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { Notes } from '../../component';

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
    title: 'الشريك',
    dataIndex: 'partner.name',
    key: 'partner._id'
  },
  {
    title: 'القيمة',
    dataIndex: 'total',
    key: 'total'
  }
];
const ReceiptTable = ({ receipt }) => (
  <Table
    columns={columns}
    dataSource={receipt}
    pagination={false}
    size="middle"
    expandedRowRender={record => <Notes notes={record.notes} />}
    onChange={(pagination, filters, sorter) => {}}
    rowKey="_id"
  />
);

export default ReceiptTable;
