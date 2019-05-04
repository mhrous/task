import React from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import DriverForm from './driverForm';
import data from './data';

const AddDriverModel = () => (
  <Modal
    title="اضافة سائق"
    visible={data.openModal}
    onOk={() => data.okModal()}
    confirmLoading={data.loadingModal}
    onCancel={() => data.closeModal()}
    bodyStyle={{ maxHeight: '350px', overflowY: 'auto' }}
  >
    <DriverForm />
  </Modal>
);

export default observer(AddDriverModel);
