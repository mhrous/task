import React from 'react';
import { Row, Col, Input, Icon, Avatar, Button, Form, Typography } from 'antd';
import { observer } from 'mobx-react';
import { Redirect, Link } from 'react-router-dom';

import { User } from '../data';

const { Text } = Typography;

const SignInPage = () => {
  if (User.logIn) return <Redirect to="/travels" />;
  return (
    <Row
      type="flex"
      justify="space-around"
      align="middle"
      style={{ height: '100vH' }}
    >
      <Col className="singin-form-container">
        <Avatar size={120} icon="user" className="singin-form-avater" />

        <Form onSubmit={e => User.onSubmit(e)}>
          <Form.Item
            validateStatus={User.errorName ? 'error' : ''}
            help={User.errorName || ''}
          >
            <Input
              placeholder="اسم المسستخدم"
              suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="large"
              type="text"
              value={User.name}
              disabled={User.loading}
              name="name"
              onChange={e => User.onChange(e)}
            />
          </Form.Item>

          <Form.Item
            validateStatus={User.errorPassword ? 'error' : ''}
            help={User.errorPassword || ''}
          >
            <Input
              placeholder="كلمة المرور"
              suffix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="large"
              type="password"
              value={User.password}
              name="password"
              disabled={User.loading}
              onChange={e => User.onChange(e)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="singin-form-btn"
              type="primary"
              size="large"
              loading={User.loading}
              onClick={e => User.onSubmit(e)}
            >
              دخول
            </Button>
          </Form.Item>
        </Form>
        <Text>
          عودة الى الصفحة
          <Link to="/travels">الرئيسية </Link>
        </Text>
      </Col>
    </Row>
  );
};

export default observer(SignInPage);
