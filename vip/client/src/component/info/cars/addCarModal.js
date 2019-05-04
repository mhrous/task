import React from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import CarForm from './carForm';
import data from './data';

const AddCarModel = () => (
  <Modal
    title="اضافة سيارة"
    visible={data.openModal}
    onOk={() => data.okModal()}
    confirmLoading={data.loadingModal}
    onCancel={() => data.closeModal()}
    bodyStyle={{ maxHeight: '350px', overflowY: 'auto' }}
  >
    <CarForm />
  </Modal>
);

export default observer(AddCarModel);
