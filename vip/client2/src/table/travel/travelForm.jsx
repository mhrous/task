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
const { Group: InputGroup } = Input;
const inlineStyle = { display: 'inline-block', width: 'calc(50% - 12px)' };
const fullWidthStyle = {
  width: 'calc(100% - 12px)'
};

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
      validateStatus={data.totalToError ? 'error' : ''}
      help={data.totalToError}
    >
      <InputNumber
        size="large"
        type="text"
        step={500}
        min={0}
        max={100000}
        value={data.totalTo}
        disabled={data.loadingModal}
        name="totalTo"
        placeholder="ذهاب"
        onChange={e => {
          data.totalTo = e;
          data.totalToError = '';
        }}
        style={{ width: '100%' }}
      />
    </Form.Item>

    <Form.Item style={inlineStyle}>
      <Switch
        checkedChildren="دين"
        unCheckedChildren="مدفوع"
        checked={data.typeTo}
        onChange={e => {
          data.typeTo = e;
          data.partnerToName = '';
          data.partnerToNameError = '';
        }}
      />
    </Form.Item>

    {data.typeTo && (
      <Form.Item
        style={fullWidthStyle}
        validateStatus={data.partnerToNameError ? 'error' : ''}
        help={data.partnerToNameError}
      >
        <Select
          size="large"
          type="text"
          value={data.partnerToName ? data.partnerToName : undefined}
          disabled={data.loadingModal || !data.typeTo}
          placeholder=" الذهاب لصالح"
          onChange={e => {
            data.partnerToName = e;
            data.partnerToNameError = '';
          }}
        >
          {data.allPartnerNames.map(e => (
            <Option key={e._id} value={e._id}>
              {e.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    )}
    <Form.Item
      style={{ marginLeft: '10px', ...inlineStyle }}
      validateStatus={data.totalBackError ? 'error' : ''}
      help={data.totalBackError}
    >
      <InputNumber
        size="large"
        step={500}
        min={0}
        max={100000}
        value={data.totalBack}
        disabled={data.loadingModal}
        name="totalBack"
        placeholder="عودة"
        onChange={e => {
          data.totalBack = e;
          data.totalBackError = '';
        }}
        style={{ width: '100%' }}
      />
    </Form.Item>
    <Form.Item style={inlineStyle}>
      <Switch
        checkedChildren="دين"
        unCheckedChildren="مدفوع"
        checked={data.typeBack}
        onChange={e => {
          data.typeBack = e;
          data.partnerBackName = '';
          data.partnerBackNameError = '';
        }}
      />
    </Form.Item>
    {data.typeBack && (
      <Form.Item
        style={fullWidthStyle}
        validateStatus={data.partnerBackNameError ? 'error' : ''}
        help={data.partnerBackNameError}
      >
        <Select
          size="large"
          type="text"
          value={data.partnerBackName ? data.partnerBackName : undefined}
          disabled={data.loadingModal || !data.typeBack}
          name="partner"
          placeholder="العودة لصالح"
          onChange={e => {
            data.partnerBackName = e;
            data.partnerBackNameError = '';
          }}
        >
          {data.allPartnerNames.map(e => (
            <Option key={e._id} value={e._id}>
              {e.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    )}
    <Form.Item
      style={fullWidthStyle}
      validateStatus={data.expenses[0][2] ? 'error' : ''}
      help={data.expenses[0][2]}
    >
      <InputGroup compact>
        <Input
          style={{ width: '50%' }}
          size="large"
          value={data.expenses[0][0]}
          disabled
        />
        <InputNumber
          style={{ width: '50%' }}
          placeholder="القيمة "
          size="large"
          value={data.expenses[0][1]}
          step={500}
          min={0}
          max={100000}
          disabled={data.loadingModal}
          onChange={e => {
            data.expenses[0][1] = e;
            data.expenses[0][2] = '';
          }}
        />
      </InputGroup>
    </Form.Item>

    {data.expenses.map((e, i) =>
      i === 0 ? (
        ''
      ) : (
        <Form.Item
          style={fullWidthStyle}
          key={i}
          validateStatus={e[2] ? 'error' : ''}
          help={e[2]}
        >
          <InputGroup compact>
            <Input
              style={{ width: '45%' }}
              placeholder="نوع المصروف "
              value={e[0]}
              size="large"
              disabled={data.loadingModal}
              onChange={e => {
                data.expenses[i][0] = e.target.value;
                data.expenses[i][2] = '';
              }}
            />
            <InputNumber
              style={{ width: '45%' }}
              placeholder="القيمة "
              value={e[1]}
              size="large"
              step={500}
              min={0}
              max={100000}
              disabled={data.loadingModal}
              onChange={e => {
                data.expenses[i][1] = e;
                data.expenses[i][2] = '';
              }}
            />
            <Icon
              type="minus-circle-o"
              style={{
                fontSize: '24px',
                marginRight: '10px',
                marginTop: '5px'
              }}
              onClick={() => data.removeExpenses(i)}
            />
          </InputGroup>
        </Form.Item>
      )
    )}

    <Form.Item style={fullWidthStyle}>
      <Button
        type="dashed"
        onClick={() => data.addExpenses()}
        style={{ width: '100%' }}
      >
        اضافة مصروف <Icon type="plus" />
      </Button>
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
    <Form.Item style={fullWidthStyle}>
      <DatePicker
        size="large"
        value={moment(data.date)}
        style={{ width: '100%' }}
        onChange={e => {
          data.date = e._d;
        }}
      />
    </Form.Item>

    <Form.Item style={fullWidthStyle}>
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
        <Form.Item key={i} style={fullWidthStyle}>
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

    <Form.Item style={fullWidthStyle}>
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
