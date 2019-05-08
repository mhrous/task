import React from 'react';
import { Table, Button, Icon } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Note } from '../../component';
import data from './data';

const columns = [
  {
    title: 'السيارة',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (text, record) => (
      <Link to={'/cars/' + record._id}>{`${text} [${record.number}]`}</Link>
    )
  }
  // ,
  // {
  //   title: 'السائق',
  //   dataIndex: 'driver',
  //   key: 'driver',
  //   sorter: true
  // },
  // {
  //   title: 'عدد السفؤات',
  //   dataIndex: 'count',
  //   key: 'count',
  //   sorter: true
  // }
];

const CarTable = () => (
  <Table
    columns={columns}
    dataSource={data.cars}
    pagination={false}
    size="middle"
    expandedRowRender={record => <Note notes={record.notes} />}
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
        onClick: event => {}
      };
    }}
  />
);

export default observer(CarTable);
