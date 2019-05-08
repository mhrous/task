import React from 'react';
import { PageHeader } from 'antd';
import { observer } from 'mobx-react';
import data from './data';

const Header = () => (
  <PageHeader title={<div>{data.id}</div>} subTitle="This is a subtitle" />
);

export default observer(Header);
