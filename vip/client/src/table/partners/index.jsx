import React, { useEffect } from 'react';
import AddPartnerModal from './addpartnerModal';
import PartnerTable from './partnerTable';
import data from './data';
const Partners = () => {
  useEffect(() => data.init());
  return (
    <div>
      <AddPartnerModal />
      <PartnerTable />
    </div>
  );
};

export default Partners;
