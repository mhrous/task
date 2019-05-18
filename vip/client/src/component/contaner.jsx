import React from 'react';
import { Layout } from 'antd';
import SideBar from './SideBar';

const { Content } = Layout;

const Contaner = ({ match, children }) => (
  <Layout style={{ height: '100vH' }}>
    <SideBar match={match} />
    <Layout>
      <Content style={{ padding: ' 24px 24px' }}>{children}</Content>
    </Layout>
  </Layout>
);

export default Contaner;
