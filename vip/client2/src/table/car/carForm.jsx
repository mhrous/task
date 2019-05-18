import React from 'react';
import { Form, Input, Button, Icon, InputNumber } from 'antd';
import { observer } from 'mobx-react';
import data from './data';

const CarForm = () => (
  <Form wrapperCol={{ span: 18 }}>
    <Form.Item
      validateStatus={data.carNameError ? 'error' : ''}
      help={data.carNameError}
      label=" نوع السيارة"
    >
      <Input
        size="large"
        type="text"
        value={data.carName}
        disabled={data.loadingModal}
        name="name"
        onChange={e => data.onChange(e)}
      />
    </Form.Item>

    <Form.Item
      validateStatus={data.carNumberError ? 'error' : ''}
      help={data.carNumberError}
      label="  رقم السيارة"
    >
      <Input
        size="large"
        type="text"
        value={data.carNumber}
        disabled={data.loadingModal}
        name="number"
        onChange={e => data.onChange(e)}
      />
    </Form.Item>
    <Form.Item
      validateStatus={data.carMaxError ? 'error' : ''}
      help={data.carMaxError}
      label="  مصروف السيارة"
    >
      <InputNumber
        min={1000}
        max={50000}
        step={500}
        size="large"
        value={data.carMax}
        disabled={data.loadingModal}
        name="max"
        onChange={e => data.onChange({ target: { value: e, name: 'max' } })}
        style={{ width: '100%' }}
      />
    </Form.Item>

    <Form.Item label=" ملاحظات">
      <Input
        size="large"
        type="text"
        value={data.notes[0]}
        disabled={data.loadingModal}
        name="note"
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

export default observer(CarForm);
