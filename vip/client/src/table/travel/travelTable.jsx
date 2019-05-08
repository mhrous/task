import React from 'react';
import { Table, Button, Icon } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';

import Notes from '../../component/Note';
import data from './data';

const columns = [
  {
    title: 'السائق',
    dataIndex: 'driver.name',
    key: 'driver'
  },
  {
    title: 'التاريخ',
    dataIndex: 'date',
    key: 'date',
    render: text => <span>{moment(text).format('YYYY-MM-DD')}</span>
  },
  {
    title: 'من => الى',

    key: 'to',
    render: record => (
      <div>
        <div>{record.from && ` من : ${record.from}`}</div>

        <div>{record.to && ` الى : ${record.to}`}</div>
      </div>
    )
  },
  {
    title: 'الزبون',
    key: 'clientName',
    render: record => (
      <div>
        <div>{record.clientName && `${record.clientName}`}</div>
        <div>{record.clientPhone && `${record.clientPhone}`}</div>
      </div>
    )
  },
  {
    title: 'النوع',
    dataIndex: 'type',
    key: 'type',
    render: (type, record) => (
      <div>
        <div>{type ? 'دين' : 'مقبوضة'}</div>
        <div>{type && `${record.partner.name}`}</div>
      </div>
    )
  },
  {
    title: 'المصروف',
    dataIndex: 'expenses',
    key: 'expenses'
  },
  {
    title: 'القيمة',
    dataIndex: 'total',
    key: 'total'
  },
  {
    key: 'action',
    render: record => (
      <div>
        <Button
          size="small"
          type="primary"
          ghost
          style={{ marginLeft: '5px' }}
          onClick={() => data.openModalForUpdata(record)}
        >
          <Icon type="form" />
        </Button>

        <Button size="small" type="danger" ghost onClick={() => data.confirmTravel(record._id)}>
          <Icon type="delete" />
        </Button>
      </div>
    )
  }
];

const TravelTable = () => (
  <Table
    columns={columns}
    dataSource={data.travelsShow}
    pagination={false}
    size="middle"
    expandedRowRender={record => <Notes notes={record.notes} />}
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
  />
);

export default observer(TravelTable);
