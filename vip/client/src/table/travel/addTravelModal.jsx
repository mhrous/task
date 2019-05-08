import React from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import TravelForm from './travelForm';
import data from './data';

const AddTravelModel = () => (
  <Modal
    title="اضافة رحلة"
    visible={data.openModal || data.openModalUpdata}
    onOk={() => data.okModal()}
    confirmLoading={data.loadingModal}
    onCancel={() => data.closeModal()}
    bodyStyle={{ maxHeight: '350px', overflowY: 'auto' }}
  >
    <TravelForm />
  </Modal>
);

export default observer(AddTravelModel);
