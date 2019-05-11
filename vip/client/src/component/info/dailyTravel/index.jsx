import React, { useEffect } from 'react';

import data from './data';
import Travels from './travel';

const Page = () => {
  useEffect(() => {
    data.init();
  });
  return <Travels />;
};

export default Page;
