import React from 'react';
import { Table, Button, Icon } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import Notes from '../../component/Note';
import data from './data';

const columns = [
  {
    title: 'الاسم',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (text, record) => (
      <Link to={'/info/partners/' + record._id}>{text}</Link>
    )
  },
  {
    title: 'أرقام الهواتف',
    dataIndex: 'phone',
    key: 'phone',
    render: phones => (
      <span>
        {Object.entries(phones).map((phone, index) => {
          return <div key={index}>{phone[0] + ' : ' + phone[1]}</div>;
        })}
      </span>
    )
  }
];

const PartnerTable = () => (
  <Table
    columns={columns}
    dataSource={data.partners}
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
        onClick: event => {}
      };
    }}
  />
);

export default observer(PartnerTable);
