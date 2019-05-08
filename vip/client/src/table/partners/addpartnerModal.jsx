import React from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import PartnerForm from './partnerForm';
import data from './data';

const AddPartnerModel = () => (
  <Modal
    title="اضافة شريك"
    visible={data.openModal}
    onOk={() => data.okModal()}
    confirmLoading={data.loadingModal}
    onCancel={() => data.closeModal()}
    bodyStyle={{ maxHeight: '350px', overflowY: 'auto' }}
  >
    <PartnerForm />
  </Modal>
);

export default observer(AddPartnerModel);
