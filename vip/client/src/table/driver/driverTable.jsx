import React from 'react';
import { Table, Button, Icon } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Notes } from '../../component';
import data from './data';

const columns = [
  {
    title: 'الاسم',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (text, record) => <Link to={'/driver/' + record._id}>{text}</Link>
  },
  {
    title: 'أرقام الهواتف',
    dataIndex: 'phone',
    key: 'phone',
    render: phones => (
      <span>
        {Object.entries(phones).map(phone => {
          return <div key={phone[1]}>{phone[0] + ' : ' + phone[1]}</div>;
        })}
      </span>
    )
  },
  {
    title: 'العنوان',
    dataIndex: 'address',
    key: 'address',
    sorter: true
  }
];
const DriverTable = () => (
  <Table
    columns={columns}
    dataSource={data.drivers}
    pagination={false}
    size="middle"
    expandedRowRender={record => <Notes notes={record.notes} />}
    onChange={(pagination, filters, sorter) => {}}
    rowKey="_id"
    footer={() => (
      <Button
        type="primary"
        onClick={() => {
          data.openModal = true;
        }}
      >
        <Icon type="plus" />
      </Button>
    )}
    onRow={(record, rowIndex) => {
      return {
        onClick: event => {
          data.selectedDriver = record._id;
        }
      };
    }}
  />
);

export default observer(DriverTable);
