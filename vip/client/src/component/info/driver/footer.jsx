import React from 'react';
import { PageHeader, Col, Row } from 'antd';
import { observer } from 'mobx-react';

import data from './data';

const Footer = () => (
  <PageHeader>
    <Row>
      <Col span={12}>
        <h3>{` مصروف : ${data.expenses} .ل س`}</h3>
      </Col>
      <Col span={12}>
        <h3>{`الصافي  : ${data.total} .ل س `}</h3>
      </Col>
      <Col span={12}>
        <h3>{` قيمة وصلات الدين : ${data.receiptValue} .ل س`}</h3>
      </Col>
      <Col span={12}>
        <h3>{` عدد ايصالات الدين : ${data.receipt.length}`}</h3>
      </Col>

      <Col span={12}>
        <h3>{` عدد نزلات الفارغة : ${data.emptyBack} `}</h3>
      </Col>
      <Col span={12}>
        <h3>{` عدد الطلعات الفارغة : ${data.emptyTo} `}</h3>
      </Col>
      <Col span={12}>
        <h3>{`تجاوز المصروف الاقصى (${data.driver.car.expensesMax})  : ${
          data.expensesMax
        } `}</h3>
      </Col>
      <Col span={12}>
        <h3>{`عدد الكلي السفرات  : ${data.travels.length} `}</h3>
      </Col>

      <Col span={24} style={{ marginTop: 10 }}>
        <h2>{`   المبلغ لازم قبضه  : ${data.total - data.receiptValue} `}</h2>
      </Col>
    </Row>
  </PageHeader>
);

export default observer(Footer);
