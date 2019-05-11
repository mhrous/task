import React, { Fragment, useEffect } from 'react';

import { Tabs } from 'antd';

import data from './data';
import Header from './header';
import Travels from './travel';

const TabPane = Tabs.TabPane;

const Info = ({ id }) => {
  useEffect(() => {
    data.init({ id });
  });
  return (
    <Fragment>
      <Tabs type="card">
        <TabPane tab="كل الرحلات" key="1">
          <Header />
          <Travels />
        </TabPane>
        <TabPane tab="وصول الدين" key="2">
          <Header />
          <Travels />
        </TabPane>
        <TabPane tab="دفعات" key="3">
          <Header />
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Fragment>
  );
};

export default Info;
