import React, { useEffect } from 'react';
import AddPartnerModal from './addpartnerModal';
import PartnerTable from './partnerTable';
import data from './data';
const All = () => {
  useEffect(() => data.initAll());
  return (
    <div>
      <AddPartnerModal />
      <PartnerTable />
    </div>
  );
};

export default All;
