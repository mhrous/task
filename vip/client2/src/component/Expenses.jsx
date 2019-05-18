import React, { Fragment } from 'react';
import { Col, Row } from 'antd';

const Exponess = ({ exponess }) => {
  return (
    <Fragment>
      {Object.entries(exponess).map((e, i) => (
        <Row key={i}>
          <Col span={12}>{e[1]}</Col>

          <Col offset={2} span={10}>
            {e[0]} :
          </Col>
        </Row>
      ))}
      <Row>
        <Col span={12}>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {Object.entries(exponess).reduce((a, b) => a + b[1], 0)}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Exponess;
