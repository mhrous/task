import { observable, action } from 'mobx';
import { message } from 'antd';
import { getJSON, postJSON } from '../../../lib';
import { API_URL } from '../../../config';

class Data {
  @observable drivers = [];
  @observable selectedDriver = {};
  //modal
  @observable openModal = false;
  @observable loadingModal = false;

  //form
  @observable driverName = '';
  @observable driverNameError = '';
  @observable driverAddress = '';
  @observable driverPhone = [['اساسي', '', '']];
  @observable driverCar = '';
  @observable driverCarError = '';

  @observable carsName = [];

  initAll() {
    this.getDriver();
    this.getCarName();
  }

  @action
  initForm() {
    this.driverName = '';
    this.driverNameError = '';
    this.driverAddress = '';
    this.driverPhone = [['اساسي', '', '']];
    this.driverCar = '';
    this.driverCarError = '';
  }

  @action
  closeModal() {
    this.openModal = false;
    this.initForm();
  }

  @action
  async okModal() {
    let error = false;
    if (this.driverName === '') {
      this.driverNameError = 'يجب عليك ادخال اسم السائق';
      error = true;
    }
    if (this.driverCar === '') {
      this.driverCarError = 'يجب عليك ادخال اختيار سيارة';
      error = true;
    }
    const phone = {};
    this.driverPhone.forEach(e => {
      const [key, value] = e;
      if (key in phone) {
        error = true;
        e[2] = 'هذا الرقم مضاف سابقا يرجى تغير الاسم';
        return;
      }
      if (key === '') {
        error = true;
        e[2] = 'لايمكن اضافة رقم من دون اسم';
        return;
      }
      if (value === '') {
        error = true;
        e[2] = 'لايمكن اضافة رقم فارغ';
        return;
      }
      phone[key] = value;
    });
    if (error) return;

    const obj = {
      phone,
      name: this.driverName,
      address: this.driverAddress || undefined,
      car: this.driverCar
    };
    this.loadingModal = true;

    try {
      const { data } = await postJSON(`${API_URL}/admin/driver`, obj);
      this.initForm();
      this.drivers = [...this.drivers, data];
      this.loadingModal = false;
      this.openModal = false;
      message.success(`تم اضافة ${obj.name} `);
    } catch (e) {
      this.driverNameError = e.name;
      this.driverCarError = e.car;
      this.loadingModal = false;
    }
  }

  @action addPhone() {
    // index 0 for key
    // index 1 for value
    // index 2 for error
    this.driverPhone.push(['', '', '']);
  }
  @action
  removePhone(index) {
    this.driverPhone.splice(index, 1);
  }

  @action
  onChange(e, index = 0) {
    const { name, value } = e.target;
    if (value === ' ') return;
    switch (name) {
      case 'name':
        this.driverName = value;
        this.driverNameError = '';
        break;
      case 'address':
        this.driverAddress = value;
        break;
      case 'key':
        this.driverPhone[index][0] = value;
        this.driverPhone[index][2] = '';
        break;
      case 'value':
        this.driverPhone[index][1] = value;
        this.driverPhone[index][2] = '';

        break;
      case 'car':
        this.driverCar = value;
        this.driverCarError = '';
        break;

      default:
        break;
    }
  }

  @action
  async getDriver() {
    try {
      const res = await getJSON(`${API_URL}/admin/driver`);
      this.drivers = res.data;
    } catch (e) {}
  }

  @action
  async getCarName() {
    try {
      const res = await getJSON(`${API_URL}/car`);
      this.carsName = res.data;
    } catch (e) {}
  }
}

export default new Data();
