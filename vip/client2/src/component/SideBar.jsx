import React from 'react';
// import { observer } from 'mobx-react';
import { Menu, Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

import User from '../User';
const selectedKey = TableName => {
  switch (TableName) {
    case 'travels':
      return '1';
    case 'driverStatus':
      return '2';
    case 'driver':
      return '3';
    case 'partners':
      return '4';
    case 'cars':
      return '5';

    default:
      return '6';
  }
};
const { Item } = Menu;
const { Sider } = Layout;
const SideBar = ({ match }) => (
  <Sider width={200} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      selectedKeys={[selectedKey(match.params.TableName)]}
      style={{ maxHeight: '100%' }}
    >
      <Item key="1">
        <Link to="/info/travels">رحلات اليوم </Link>
      </Item>
      <Item key="2">
        <Link to="/info/driverStatus"> حالة السائقين </Link>
      </Item>
      {User.logIn && (
        <Item key="3">
          <Link to="/info/driver"> السائقين </Link>
        </Item>
      )}
      {User.logIn && (
        <Item key="4">
          <Link to="/info/partners">الشركاء </Link>
        </Item>
      )}
      {User.logIn && (
        <Item key="5">
          <Link to="/info/cars">السيارات </Link>
        </Item>
      )}
      {User.logIn && (
        <Item key="6">
          <Link to="/settings">الاعدادات </Link>
        </Item>
      )}
    </Menu>
    {!User.logIn && (
      <Button className="side-bar-btn" type="primary" size="large">
        <Link to="/signIn"> تسجيل الدخول</Link>
      </Button>
    )}
    {User.logIn && (
      <Button
        className="side-bar-btn"
        type="primary"
        size="large"
        onClick={() => User.logOut()}
      >
        <Link to="/info/travels"> تسجيل الخروج</Link>
      </Button>
    )}
  </Sider>
);

export default SideBar;
