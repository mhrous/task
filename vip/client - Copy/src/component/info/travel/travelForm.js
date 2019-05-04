import React from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
  Switch,
  DatePicker,
  Select,
  InputNumber
} from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';
import data from './data';

const { Option } = Select;
const inlineStyle = { display: 'inline-block', width: 'calc(50% - 12px)' };

const travelForm = () => (
  <Form>
    <Form.Item
      style={{
        ...inlineStyle,
        marginLeft: '10px'
      }}
      validateStatus={data.driverNameError ? 'error' : ''}
      help={data.driverNameError}
    >
      <Select
        size="large"
        type="text"
        value={data.driverName || undefined}
        disabled={data.loadingModal}
        name="driver"
        placeholder="السائق"
        onChange={e => data.onChange({ target: { value: e, name: 'driver' } })}
      >
        {data.driverCar.map(e => (
          <Option key={e._id} value={e._id}>
            {e.name}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      style={inlineStyle}
      validateStatus={data.carNameError ? 'error' : ''}
      help={data.carNameError}
    >
      <Select
        size="large"
        type="text"
        value={data.carName || undefined}
        disabled={data.loadingModal}
        name="car"
        placeholder="السيارة"
        onChange={e => data.onChange({ target: { value: e, name: 'car' } })}
      >
        {data.driverCar.map(e => (
          <Option key={e.car._id} value={e.car._id}>
            {e.car.name}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      style={{
        ...inlineStyle,
        marginLeft: '10px'
      }}
    >
      <Select
        size="large"
        type="text"
        value={data.from || undefined}
        disabled={data.loadingModal}
        name="from"
        placeholder="من"
        onChange={e => {
          data.from = e;
        }}
      >
        {data.fromToOption.map(e => (
          <Option key={e} value={e}>
            {e}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item style={inlineStyle}>
      <Select
        size="large"
        type="text"
        value={data.to || undefined}
        disabled={data.loadingModal}
        name="to"
        placeholder="الى"
        onChange={e => {
          data.to = e;
        }}
      >
        {data.fromToOption.map(e => (
          <Option key={e} value={e}>
            {e}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      style={{
        ...inlineStyle,
        marginLeft: '10px'
      }}
      validateStatus={data.expensesError ? 'error' : ''}
      help={data.expensesError}
    >
      <InputNumber
        size="large"
        type="text"
        value={data.expenses}
        step={500}
        min={0}
        max={100000}
        disabled={data.loadingModal}
        name="expenses"
        placeholder="مصروف"
        onChange={e => {
          data.expenses = e;
          data.expensesError = '';
        }}
        style={{ width: '100%' }}
      />
    </Form.Item>

    <Form.Item
      style={inlineStyle}
      validateStatus={data.totalError ? 'error' : ''}
      help={data.totalError}
    >
      <InputNumber
        size="large"
        type="text"
        step={500}
        min={0}
        max={100000}
        value={data.total}
        disabled={data.loadingModal}
        name="total"
        placeholder="اجمالي"
        onChange={e => {
          data.total = e;
          data.totalError = '';
        }}
        style={{ width: '100%' }}
      />
    </Form.Item>

    <Form.Item
      style={{
        ...inlineStyle,
        marginLeft: '10px'
      }}
      validateStatus={data.partnerNameError ? 'error' : ''}
      help={data.partnerNameError}
    >
      <Select
        size="large"
        type="text"
        value={data.partnerName}
        disabled={data.loadingModal || !data.type}
        name="partner"
        placeholder="الشريك"
        onChange={e => {
          data.partnerName = e;
          data.partnerNameError = '';
        }}
      >
        {data.allPartnerNameS.map(e => (
          <Option key={e._id} value={e._id}>
            {e.name}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item style={inlineStyle}>
      <Switch
        checkedChildren="دين"
        unCheckedChildren="مدفوع"
        checked={data.type}
        onChange={e => {
          data.type = e;
          data.partnerName = '';
          data.partnerNameError = '';
        }}
      />
    </Form.Item>

    <Form.Item
      style={{
        ...inlineStyle,
        marginLeft: '10px'
      }}
    >
      <Input
        size="large"
        type="text"
        value={data.clientName}
        disabled={data.loadingModal}
        name="clientName"
        placeholder="اسم الزبون"
        onChange={e => {
          data.clientName = e.target.value;
        }}
      />
    </Form.Item>

    <Form.Item style={inlineStyle}>
      <Input
        size="large"
        type="text"
        value={data.clientPhone}
        disabled={data.loadingModal}
        name="clientPhone"
        placeholder="رقم الزبون"
        onChange={e => {
          data.clientPhone = e.target.value;
        }}
      />
    </Form.Item>
    <Form.Item>
      <DatePicker
        size="large"
        value={moment(data.date)}
        style={{ width: '100%' }}
        onChange={e => {
          console.log(e);
          data.date = e._d;
        }}
      />
    </Form.Item>

    <Form.Item>
      <Input
        size="large"
        type="text"
        value={data.notes[0]}
        disabled={data.loadingModal}
        name="note"
        placeholder="ملاحظة "
        onChange={e => data.onChange(e, 0)}
      />
    </Form.Item>

    {data.notes.map((e, i) =>
      i === 0 ? (
        ''
      ) : (
        <Form.Item key={i}>
          <Input
            size="large"
            type="text"
            value={data.notes[i]}
            disabled={data.loadingModal}
            name="note"
            placeholder={`ملاحظة ${i}`}
            onChange={e => data.onChange(e, i)}
            style={{ width: '90%' }}
          />
          <Icon
            type="minus-circle-o"
            style={{
              fontSize: '24px',
              marginRight: '10px',
              marginTop: '5px'
            }}
            onClick={() => data.removeNote(i)}
          />
        </Form.Item>
      )
    )}

    <Form.Item>
      <Button
        type="dashed"
        onClick={() => data.addNote()}
        style={{ width: '100%' }}
      >
        اضافة ملاحظة جديدة <Icon type="plus" />
      </Button>
    </Form.Item>
  </Form>
);

export default observer(travelForm);
