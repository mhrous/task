import React, { useEffect } from 'react';

import StatusTable from './statusTable';
import data from './data';

const Info = () => {
  useEffect(() => data.init());

  return <StatusTable />;
};

export default Info;
