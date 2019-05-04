import React from 'react';
import { Tabs } from 'antd';
import DriverForm from './driverForm';
import A from '../../DriverTable';

const TabPane = Tabs.TabPane;
const Info = () => (
  <div>
    <Tabs type="card" onChange={() => {}}>
      <TabPane tab="سفرات" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="وصول الدين" key="2">
        <A />
      </TabPane>
      <TabPane tab="الايصالات" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="الحساب" key="4">
        Content of Tab Pane 4
      </TabPane>
      <TabPane tab="الاعدادت" key="5">
        444
      </TabPane>
    </Tabs>
    ,
  </div>
);

export default Info;
