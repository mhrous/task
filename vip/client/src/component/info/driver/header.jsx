import React from 'react';
import { PageHeader, DatePicker } from 'antd';
import { observer } from 'mobx-react';

import data from './data';

const { MonthPicker } = DatePicker;

const Header = () => (
  <PageHeader
    title={
      <div>
        {`السائق : ${data.driver.name} `}
        <br />
        {` السيارة : ${data.driver.car.name} (${data.driver.car.number})`}
        <br />
      </div>
    }
    extra={
      <MonthPicker
        defaultValue={data.date}
        onChange={d => {
          data.date = d;
          data.getTravel();
        }}
        placeholder="Select month"
      />
    }
  />
);

export default observer(Header);
