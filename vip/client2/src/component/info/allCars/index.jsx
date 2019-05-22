import React, { useEffect } from 'react';

import data from './data';
import Cars from './car';

const Page = () => {
  useEffect(() => {
    data.init();
  });
  return <Cars />;
};

export default Page;
