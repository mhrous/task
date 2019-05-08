import { observable, action } from 'mobx';
import { message } from 'antd';
import { getJSON, postJSON } from '../../lib';
import { API_URL } from '../../config';

class Data {
  @observable cars = [];
  //modal
  @observable openModal = false;
  @observable loadingModal = false;

  //form
  @observable carName = '';
  @observable carNameError = '';
  @observable carNumber = '';
  @observable carNumberError = '';
  @observable carMax = '5000';
  @observable carMaxError = '';
  @observable notes = [''];

  @action
  initForm() {
    this.carName = '';
    this.carNameError = '';
    this.carNumber = '';
    this.carNumberError = '';
    this.carMax = '5000';
    this.carMaxError = '';
    this.notes = [''];
  }

  @action
  closeModal() {
    this.openModal = false;
    this.initForm();
  }
  @action
  async okModal() {
    let error = false;
    if (this.carName === '') {
      this.carNameError = 'يجب عليك ادخال نوع السيارة';
      error = true;
    }
    if (this.carNumber === '') {
      this.carNumberError = 'يجب عليك ادخال رقم السيارة';
      error = true;
    }
    if (this.carMax === '') {
      this.carMaxError = 'يجب عليك ادخال المصروف الاعظمي للسيارة';
      error = true;
    }

    if (error) return;
    this.notes = this.notes.filter(e => e);

    const obj = {
      name: this.carName,
      number: this.carNumber,
      expensesMax: this.carMax,
      notes: this.notes
    };
    this.loadingModal = true;

    try {
      const { data } = await postJSON(`${API_URL}/admin/car`, obj);
      this.initForm();

      this.cars = [...this.cars, data];
      this.loadingModal = false;
      this.openModal = false;
      message.success(`تم اضافة ${obj.name} [ ${obj.number} ] `);
    } catch (e) {
      this.carNameError = e.name;
      this.carNumberError = e.number;
      this.carMaxError = e.expensesMax;
      this.loadingModal = false;
    }
  }

  @action addNote() {
    this.notes.push('');
  }
  @action
  removeNote(index) {
    this.notes.splice(index, 1);
  }

  @action
  onChange(e, index = 0) {
    const { name, value } = e.target;
    if (value === ' ') return;
    switch (name) {
      case 'name':
        this.carName = value;
        this.carNameError = '';
        break;
      case 'number':
        this.carNumber = value;
        this.carNumberError = '';

        break;
      case 'max':
        this.carMax = value;
        this.carMaxError = '';
        break;
      case 'note':
        this.notes[index] = value;
        break;
      default:
        break;
    }
  }

  @action
  async getCars() {
    try {
      const res = await getJSON(`${API_URL}/admin/car`);
      this.cars = res.data;
    } catch (e) {}
  }

  init() {
    this.getCars();
  }
}

export default new Data();
