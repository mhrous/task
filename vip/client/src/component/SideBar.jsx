import React from 'react';
import { observer } from 'mobx-react';
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
      break;
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
        <Link to="/travels">رحلات اليوم </Link>
      </Item>
      <Item key="2">
        <Link to="/driverStatus"> حالة السائقين </Link>
      </Item>
      {User.logIn && (
        <Item key="3">
          <Link to="/driver"> السائقين </Link>
        </Item>
      )}
      {User.logIn && (
        <Item key="4">
          <Link to="/partners">الشركاء </Link>
        </Item>
      )}
      {User.logIn && (
        <Item key="5">
          <Link to="/cars">السيارات </Link>
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
        <Link to="/travels"> تسجيل الخروج</Link>
      </Button>
    )}
  </Sider>
);

export default observer(SideBar);
