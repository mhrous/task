import React, { Fragment, useEffect } from 'react';

import data from './data';
import Header from './header';

const Info = ({ id }) => {
  useEffect(() => {
    data.init({ id });
  });
  return (
    <Fragment>
      <Header />
    </Fragment>
  );
};

export default Info;
