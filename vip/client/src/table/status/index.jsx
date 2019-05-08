import React, { useEffect } from 'react';

import Table from './table';
import data from './data';

const Status = () => {
  useEffect(() => data.init());

  return <Table />;
};

export default Status;
