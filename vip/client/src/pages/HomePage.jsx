import React from 'react';
import { Layout } from 'antd';
import { SideBar } from '../component';
import Information from './Information';

const { Content } = Layout;

const HomePage = ({ match }) => (
  <Layout style={{ height: '100vH' }}>
    <SideBar match={match} />
    <Layout>
      <Content style={{ padding: ' 24px 24px' }}>
        <Information match={match} />
      </Content>
    </Layout>
  </Layout>
);

export default HomePage;
