import React, { Fragment } from 'react';
import { Table, Button, Icon } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';

import { Notes, Exponess } from '../../component';
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
  // {
  //   title: 'من => الى',

  //   key: 'to',
  //   render: record => (
  //     <div>
  //       <div>{record.from && ` من : ${record.from}`}</div>

  //       <div>{record.to && ` الى : ${record.to}`}</div>
  //     </div>
  //   )
  // },
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
    title: 'المصروف',
    dataIndex: 'expenses[مصروف]',
    key: 'expenses'
  },
  {
    title: ' مصاريف اضافية',
    dataIndex: 'expenses',
    key: 'expenses',
    render: record => <Exponess exponess={record} />
  },
  {
    title: 'ذهاب',
    key: 'totalTo',
    render: record => (
      <Fragment>
        <div style={{ textAlign: 'center' }}>
          {record.totalTo ? record.totalTo : 'فاضي'}
        </div>
        {record.partnerTo && (
          <div style={{ textAlign: 'center' }}>( {record.partnerTo.name} )</div>
        )}
      </Fragment>
    )
  },
  {
    title: 'اياب',
    key: 'totalBack',
    render: record => (
      <Fragment>
        <div style={{ textAlign: 'center' }}>
          {record.totalBack ? record.totalBack : 'فاضي'}
        </div>
        {record.partnerBack && (
          <div style={{ textAlign: 'center' }}>
            ( {record.partnerBack.name} )
          </div>
        )}
      </Fragment>
    )
  },

  {
    title: 'صافي',
    key: '_id',
    render: record => (
      <Fragment>
        {record.totalBack + record.totalTo - record.expenses['مصروف']}
      </Fragment>
    )
  },
  {
    key: 'action',
    render: record => (
      <Fragment>
        <Button
          size="small"
          type="primary"
          ghost
          style={{ marginLeft: '5px' }}
          onClick={() => data.openModalForUpdata(record)}
        >
          <Icon type="form" />
        </Button>

        <Button
          size="small"
          type="danger"
          ghost
          onClick={() => data.confirmTravel(record._id)}
        >
          <Icon type="delete" />
        </Button>
      </Fragment>
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
    bordered
    footer={() => (
      <Button
        type="primary"
        onClick={() => {
          data.openModal = true;
          data.getDriverAndCarName();
          data.getPartnerName();
        }}
      >
        <Icon type="plus" />
      </Button>
    )}
  />
);

export default observer(TravelTable);
