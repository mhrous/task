import { observable, action, computed } from 'mobx';
import { message, Modal } from 'antd';
import { getJSON, postJSON, deleteJSON, putJSON } from '../../lib';
import { API_URL } from '../../config';
const confirm = Modal.confirm;

class Data {
  idDriver = null;
  @observable travels = [];
  @observable selectedTreavel = {};
  //modal
  @observable openModal = false;
  @observable loadingModal = false;

  @observable openModalUpdata = false;
  idForUpdata = '';

  //form
  @observable driverName = '';
  @observable driverNameError = '';

  @observable carName = '';
  @observable carNameError = '';

  @observable partnerToName = '';
  @observable partnerToNameError = '';
  @observable typeTo = false;
  @observable partnerBackName = '';
  @observable partnerBackNameError = '';
  @observable typeBack = false;

  @observable totalTo = '';
  @observable totalToError = '';
  @observable totalBack = '';
  @observable totalBackError = '';
  @observable expensesError = '';
  @observable from = '';
  @observable to = '';
  @observable date = new Date();
  @observable clientName = '';
  @observable clientPhone = '';
  @observable notes = [''];
  @observable expenses = [['', '', '']];

  //
  @observable allPartnerNames = [];
  @observable driverCar = [];
  fromToOption = ['دمشق', 'بيروت', 'مطار بيروت', 'مطار دمشق'];
  @action
  initForm() {
    this.driverNameError = '';
    this.driverName = '';
    this.carName = '';
    this.carNameError = '';
    this.partnerToName = '';
    this.partnerToNameError = '';
    this.typeTo = false;
    this.partnerBackName = '';
    this.partnerBackNameError = '';
    this.typeBack = false;
    this.totalTo = '';
    this.totalToError = '';
    this.totalBack = '';
    this.totalBackError = '';
    this.expensesError = '';
    this.from = '';
    this.to = '';
    this.clientName = '';
    this.clientPhone = '';
    this.notes = [''];
    this.date = new Date();
    this.expenses = [['', '', '']];
  }

  @action
  closeModal() {
    this.openModal = false;
    this.openModalUpdata = false;
    this.idForUpdata = '';
    this.initForm();
  }
  @action openModalForUpdata(record) {
    this.idForUpdata = record._id;
    this.openModalUpdata = true;
    this.partnerToName = record.partnerTo ? record.partnerTo._id : '';
    this.partnerBackName = record.partnerBack ? record.partnerBack._id : '';
    this.expenses = Object.entries(record.expenses);
    this.totalTo = record.totalTo;
    this.totalBack = record.totalBack;
    this.from = record.from;
    this.to = record.to;
    this.date = record.date;
    this.typeTo = record.partnerTo ? true : false;
    this.typeBack = record.partnerBack ? true : false;

    this.clientName = record.clientName;
    this.clientPhone = record.clientPhone;
    this.notes = record.notes;
    this.driverName = record.driver._id;
    this.carName = record.car;
  }

  @action
  async okModal() {
    let error = false;
    if (this.carName === '') {
      this.carNameError = 'يجب عليك ادخال نوع السيارة';
      error = true;
    }
    if (this.driverName === '') {
      this.driverNameError = 'يجب عليك ادخال اسم السائق';
      error = true;
    }
    if (this.totalTo === '') {
      this.totalToError = 'يجب عليك ادخال قيمة الذهاب السفرة';
      error = true;
    }
    if (this.totalBack === '') {
      this.totalBackError = 'يجب عليك ادخال قيمة العودة السفرة';
      error = true;
    }

    if (this.typeTo && this.partnerToName === '') {
      this.partnerToNameError = 'يجب عليك ادخال سفرة الدين لصالح';
      error = true;
    }
    if (this.typeBack && this.partnerBackName === '') {
      this.partnerBackNameError = 'يجب عليك ادخال سفرة الدين لصالح';
      error = true;
    }
    const expenses = {};
    this.expenses.forEach(e => {
      const [key, value] = e;
      if (key in expenses) {
        error = true;
        e[2] = 'هذا المصروف مضاف سابقا يرجى تغير الاسم';
      }
      if (key === '') {
        error = true;
        e[2] = 'لايمكن اضافة مصروف من دون نوع';
      }
      if (value === '' || !value) {
        error = true;
        e[2] = 'لايمكن اضافة مصروف فارغ';
      }
      expenses[key] = value;
    });
    console.log({ error });
    if (error) return;
    console.log('NO EeeOR');
    const obj = {
      car: this.carName,
      driver: this.driverName || undefined,

      date: this.date,
      notes: this.notes.filter(e => e),
      from: this.from || undefined,
      to: this.to || undefined,
      clientName: this.clientName || undefined,
      clientPhone: this.clientPhone || undefined,
      totalTo: this.totalTo,
      totalBack: this.totalBack,
      partnerTo: this.partnerToName || undefined,
      partnerBack: this.partnerBackName || undefined,
      expenses
    };
    console.log(obj);

    this.loadingModal = true;

    try {
      if (!this.openModalUpdata) {
        const { data } = await postJSON(`${API_URL}/travel`, obj);
        console.log(data);

        this.travels = [...this.travels, data];
        message.success(`تم اضافة السفرة بنجاح`);
      } else {
        const { data } = await putJSON(
          `${API_URL}/travel/${this.idForUpdata}`,
          obj
        );
        console.log(data);
        let updataIndex = this.travels.findIndex(
          e => e._id === this.idForUpdata
        );
        this.travels = [
          ...this.travels.slice(0, updataIndex),
          data,
          ...this.travels.slice(updataIndex + 1)
        ];

        message.success(`تم تعديل السفرة بنجاح`);
      }
      this.initForm();

      this.loadingModal = false;
      this.openModal = false;
      this.openModalUpdata = false;
    } catch (e) {
      this.expensesError = e.expenses;
      this.totalToError = e.totalTo;
      this.totalBackError = e.totalBack;
      this.partnerNameError = e.partner;
      this.driverNameError = e.driver;
      this.carNameError = e.car;
      this.loadingModal = false;
      this.openModalUpdata = false;
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
      case 'car':
        this.carName = value;
        this.carNameError = '';
        break;
      case 'driver':
        this.driverName = value;
        this.driverNameError = '';
        const obj = this.driverCar.find(e => e._id === value);
        this.carName = obj.car._id;
        this.carNameError = '';

        break;

      case 'note':
        this.notes[index] = value;
        break;
      default:
        break;
    }
  }

  @action
  async getDriverAndCarName() {
    try {
      const { data } = await getJSON(`${API_URL}/partner`);
      this.allPartnerNames = data;
    } catch (e) {}
  }

  @action
  async getPartnerName() {
    try {
      const res = await getJSON(`${API_URL}/driver/car`);
      this.driverCar = res.data;
    } catch (e) {}
  }

  init({ travels, idDriver }) {
    this.travels = travels;
    this.idDriver = idDriver || null;
    this.getDriverAndCarName();
    this.getPartnerName();
  }

  @action
  async deleteTravel(id) {
    try {
      await deleteJSON(`${API_URL}/travel/${id}`);
      this.travels = this.travels.filter(e => e._id !== id);
    } catch (e) {}
  }

  confirmTravel(id) {
    confirm({
      title: 'هلى انت متاكد من عملية الحذف',
      okText: 'نعم',
      okType: 'danger',
      cancelText: 'لا',
      onOk: () => {
        this.deleteTravel(id);
      }
    });
  }

  @computed
  get travelsShow() {
    return this.travels.sort((a, b) => {
      const _a = new Date(a.date);
      const _b = new Date(b.date);

      return _a.getTime() - _b.getTime();
    });
  }

  @action addExpenses() {
    // index 0 for key
    // index 1 for value
    // index 2 for error
    this.expenses.push(['', '', '']);
  }
  @action
  removeExpenses(index) {
    this.expenses.splice(index, 1);
  }
}

export default new Data();
