import React, { Fragment } from 'react';
import { Col, Row } from 'antd';

const Exponess = ({ exponess }) => {
  let array = Object.entries(exponess);
  if (array.length === 1) return <Fragment>لايوجد</Fragment>;
  console.log(array);
  array = array.filter(e => e[0] !== 'مصروف');

  return (
    <Fragment>
      {array.map((e, i) => (
        <Row key={i}>
          {console.log(i)}
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
        <Col span={12}>{array.reduce((a, b) => a + b[1], 0)}</Col>
      </Row>
    </Fragment>
  );
};

export default Exponess;
