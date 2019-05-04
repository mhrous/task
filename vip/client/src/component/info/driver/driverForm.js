import React from 'react';
import { Form, Input, Button, Icon, Select } from 'antd';
import { observer } from 'mobx-react';
import data from './data';
const InputGroup = Input.Group;

const DriverForm = () => (
  <Form wrapperCol={{ span: 18 }}>
    <Form.Item
      validateStatus={data.driverNameError ? 'error' : ''}
      help={data.driverNameError}
      label="  اسم السائق"
    >
      <Input
        size="large"
        type="text"
        value={data.driverName}
        disabled={data.loadingModal}
        name="name"
        onChange={e => data.onChange(e)}
      />
    </Form.Item>

    <Form.Item labelAlign="right" label="  عنوان السائق">
      <Input
        size="large"
        type="text"
        value={data.driverAddress}
        disabled={data.loadingModal}
        name="address"
        onChange={e => data.onChange(e)}
      />
    </Form.Item>
    <Form.Item
      label=" اختر سيارة"
      validateStatus={data.driverCarError ? 'error' : ''}
      help={data.driverCarError}
    >
      <Select
        style={{ width: '100%' }}
        value={data.driverCar}
        optionFilterProp="children"
        size="large"
        onSelect={e => data.onChange({ target: { value: e, name: 'car' } })}
      >
        {data.carsName.map(e => (
          <Select.Option key={e._id} value={e._id}>{`${e.name} (${
            e.number
          })`}</Select.Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      label=" هواتف"
      validateStatus={data.driverPhone[0][2] ? 'error' : ''}
      help={data.driverPhone[0][2]}
    >
      <InputGroup compact>
        <Input style={{ width: '50%' }} value="اساسي" disabled />
        <Input
          style={{ width: '50%' }}
          placeholder="ادخل رقمك الرئيسي"
          value={data.driverPhone[0][1]}
          onChange={e => data.onChange(e)}
          name="value"
        />
      </InputGroup>
    </Form.Item>

    {data.driverPhone.map((e, i) =>
      i === 0 ? (
        ''
      ) : (
        <Form.Item key={i} validateStatus={e[2] ? 'error' : ''} help={e[2]}>
          <InputGroup compact>
            <Input
              style={{ width: '40%' }}
              value={e[0]}
              name="key"
              placeholder={`  هاتف  ${i} `}
              onChange={e => data.onChange(e, i)}
            />
            <Input
              style={{ width: '50%' }}
              value={e[1]}
              name="value"
              placeholder={`  رقم ${i}`}
              onChange={e => data.onChange(e, i)}
            />
            <Icon
              type="minus-circle-o"
              style={{
                fontSize: '24px',
                marginRight: '10px',
                marginTop: '5px'
              }}
              onClick={() => data.removePhone(i)}
            />
          </InputGroup>
        </Form.Item>
      )
    )}

    <Form.Item>
      <Button
        type="dashed"
        onClick={() => data.addPhone()}
        style={{ width: '100%' }}
      >
        اضافة رقم جديد <Icon type="plus" />
      </Button>
    </Form.Item>
  </Form>
);

export default observer(DriverForm);
