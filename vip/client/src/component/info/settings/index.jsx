import React, { Fragment, useEffect } from 'react';
import data from './data';
import ChangeAdminInfo from './changeAdminInfoForm';
const Settings = () => {
  useEffect(() => {
    data.init();
  });
  return (
    <Fragment>
      <ChangeAdminInfo />
    </Fragment>
  );
};

export default Settings;
