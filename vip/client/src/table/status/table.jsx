import React from 'react';
import { Table, Select, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import data from './data';
const Option = Select.Option;

const columns = [
  {
    title: 'الاسم',
    dataIndex: 'driver.name',
    key: 'name',
    sorter: true
  },
  {
    title: 'أرقام الهواتف',
    dataIndex: 'driver.phone',
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
    title: 'متواجد',
    dataIndex: 'place',
    key: 'place',
    sorter: true,
    render: (text, record) => (
      <Select
        style={{ width: 200 }}
        onChange={e => data.onChange(record._id, 'place', e)}
        defaultValue={text}
      >
        <Option value=" " />
        <Option value="دمشق">دمشق</Option>
        <Option value="بيروت">بيروت</Option>
      </Select>
    )
  },
  {
    title: 'ذهاب ',
    key: 'go',
    dataIndex: 'go',
    sorter: true,
    render: (go, record) => (
      <Checkbox
        checked={go}
        onChange={e => data.onChange(record._id, 'go', e.target.checked)}
      />
    )
  },
  {
    title: 'اياب ',
    key: 'back',
    dataIndex: 'back',
    sorter: true,
    render: (back, record) => (
      <Checkbox
        checked={back}
        onChange={e => data.onChange(record._id, 'back', e.target.checked)}
      />
    )
  }
];

const StatusTable = () => (
  <Table
    columns={columns}
    dataSource={data.tableData}
    pagination={false}
    size="middle"
    bordered={true}
    defaultExpandAllRows={true}
    expandRowByClick={true}
    onChange={(pagination, filters, sorter) => {
      data.sortKey = sorter.columnKey;
      data.sortType = sorter.order;
    }}
    rowKey="_id"
  />
);

export default observer(StatusTable);
