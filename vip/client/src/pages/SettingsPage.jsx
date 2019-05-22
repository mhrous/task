import React from 'react';
import { Card } from 'antd';
import { Contaner, Settings } from '../component';

const SettingsPage = ({ match }) => (
  <Contaner match={match}>
    <Card>
      <Settings />
    </Card>
  </Contaner>
);

export default SettingsPage;
