import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { observer } from 'mobx-react';
import data from './data';

const ChangeAdminInfo = () => {
  return (
    <Form wrapperCol={{ span: 20 }}>
      <Form.Item
        validateStatus={data.errorName ? 'error' : ''}
        help={data.errorName || ''}
        label="اسم المسستخدم الجديد"
      >
        <Input
          suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          size="large"
          type="text"
          value={data.name}
          disabled={data.loading}
          name="name"
          onChange={e => {
            data.name = e.target.value;
            data.errorName = '';
          }}
        />
      </Form.Item>

      <Form.Item
        validateStatus={data.errorPassword ? 'error' : ''}
        help={data.errorPassword || ''}
        label="كلمة المرور الجديدة"
      >
        <Input.Password
          size="large"
          type="password"
          value={data.password}
          name="password"
          disabled={data.loading}
          onChange={e => {
            data.password = e.target.value;
            data.errorPassword = '';
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="singin-form-btn"
          type="primary"
          size="large"
          loading={data.loading}
          onClick={e => data.changedUserInfo(e)}
          style={{ float: 'left' }}
        >
          تغير
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(ChangeAdminInfo);
