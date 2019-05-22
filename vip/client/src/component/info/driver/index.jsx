import React, { Fragment, useEffect } from 'react';

import { Tabs } from 'antd';

import data from './data';
import Header from './header';
import Travels from './travel';
import Receipt from './receipt';
import Expenses from './expenses';
import Footer from './footer';

const TabPane = Tabs.TabPane;

const Page = ({ id }) => {
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
          <Receipt />
        </TabPane>
        <TabPane tab="مصاريف اضافية" key="3">
          <Header />
          <Expenses />
        </TabPane>
        <TabPane tab="دفعات" key="4">
          <Header />
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <Footer />
    </Fragment>
  );
};

export default Page;
