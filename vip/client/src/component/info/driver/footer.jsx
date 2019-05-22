import React from 'react';
import { PageHeader, Col, Row } from 'antd';
import { observer } from 'mobx-react';

import data from './data';

const Footer = () => (
  <PageHeader>
    <Row>
      <Col span={12}>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.totalWithotExpenses}.ل س</h3>
          </Col>
          <Col span={8}>
            <h3> اجمالي السفرات :</h3>{' '}
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.expenses}.ل س</h3>
          </Col>
          <Col span={8}>
            <h3> اجمالي المصروف :</h3>{' '}
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.total}.ل س</h3>
          </Col>
          <Col span={8}>
            <h3> الصافي :</h3>{' '}
          </Col>
        </Row>

        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.receiptValue}.ل س</h3>
          </Col>
          <Col span={8}>
            <h3> قيمة وصول الدين :</h3>{' '}
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.payments}.ل س</h3>
          </Col>
          <Col span={8}>
            <h3> دفعات :</h3>{' '}
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.extraExpenses}.ل س</h3>
          </Col>
          <Col span={8}>
            <h3> مصاريف اضافية :</h3>{' '}
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3>
              {' '}
              {data.total -
                data.extraExpenses -
                data.payments -
                data.receiptValue}
              .ل س
            </h3>
          </Col>
          <Col span={8}>
            <h3> المبلغ الواجب قبضه :</h3>{' '}
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.travels.length}</h3>
          </Col>
          <Col span={8}>
            <h3>عدد الكلي للسفرات :</h3>
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.emptyBack}</h3>
          </Col>
          <Col span={8}>
            <h3>عدد نزلات الفارغة :</h3>
          </Col>
        </Row>

        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.emptyTo}</h3>
          </Col>
          <Col span={8}>
            <h3>عدد الطلعات الفارغة :</h3>
          </Col>
        </Row>

        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.expensesMax}</h3>
          </Col>
          <Col span={8}>
            <h3>تجاوز المصروف الاقصى ({data.driver.car.expensesMax}):</h3>
          </Col>
        </Row>
        <Row>
          <Col span={8} />

          <Col span={8}>
            <h3> {data.receipt.length}</h3>
          </Col>
          <Col span={8}>
            <h3>عدد ايصالات الدين :</h3>
          </Col>
        </Row>
      </Col>
    </Row>
  </PageHeader>
);

export default observer(Footer);
