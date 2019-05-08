import { observable, action, computed } from 'mobx';
import { message, Modal } from 'antd';
import { getJSON, postJSON, deleteJSON, putJSON } from '../../lib';
import { API_URL } from '../../config';
const confirm = Modal.confirm;

class Data {
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

  @observable partnerName = '';
  @observable partnerNameError = '';
  @observable total = '';
  @observable totalError = '';
  @observable expenses = '';
  @observable expensesError = '';
  @observable from = '';
  @observable to = '';
  @observable date = new Date();
  @observable type = false;
  @observable clientName = '';
  @observable clientPhone = '';
  @observable notes = [''];
  //
  @observable allPartnerNameS = [];
  @observable driverCar = [];
  fromToOption = ['دمشق', 'بيروت', 'مطار بيروت', 'مطار دمشق'];
  @action
  initForm() {
    this.driverNameError = '';
    this.driverName = '';
    this.carName = '';
    this.carNameError = '';
    this.partnerName = '';
    this.total = '';
    this.totalError = '';
    this.expenses = '';
    this.expensesError = '';
    this.from = '';
    this.to = '';
    this.type = false;
    this.clientName = '';
    this.clientPhone = '';
    this.notes = [''];
    this.date = new Date();
    this.partnerNameError = '';
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
    this.partnerName = record.partner ? record.partner._id : '';
    this.total = record.total;
    this.expenses = record.expenses;
    this.from = record.from;
    this.to = record.to;
    this.date = record.date;
    this.type = record.type;
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
    if (this.total === '') {
      this.totalError = 'يجب عليك ادخال قيمة السفرة';
      error = true;
    }

    if (this.expenses === '') {
      this.expensesError = 'يجب عليك ادخال مصروف  السفرة';
      error = true;
    }
    if (this.type && this.partnerName === '') {
      this.partnerNameError = 'يجب عليك ادخال سفرة الدين لصالح';
      error = true;
    }
    if (error) return;

    const obj = {
      car: this.carName,
      driver: this.driverName,
      date: this.date,
      notes: this.notes.filter(e => e),
      from: this.from || undefined,
      to: this.to || undefined,
      clientName: this.clientName || undefined,
      clientPhone: this.clientPhone || undefined,
      type: this.type,
      total: this.total,
      expenses: this.expenses,
      partner: this.partnerName || undefined
    };

    this.loadingModal = true;

    try {
      if (!this.openModalUpdata) {
        const { data } = await postJSON(`${API_URL}/travel`, obj);
        this.travels = [...this.travels, data];
        message.success(`تم اضافة السفرة بنجاح`);
      } else {
        const { data } = await putJSON(`${API_URL}/travel/${this.idForUpdata}`, obj);
        let updataIndex = this.travels.findIndex(e => e._id === this.idForUpdata);
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
      this.totalError = e.total;
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
  async getTravel() {
    try {
      const res = await getJSON(`${API_URL}/travel`);
      this.travels = res.data;
    } catch (e) {}
  }

  @action
  async getDriverAndCarName() {
    try {
      const res = await getJSON(`${API_URL}/partner`);
      this.allPartnerNameS = res.data;
    } catch (e) {}
  }

  @action
  async getPartnerName() {
    try {
      const res = await getJSON(`${API_URL}/driver/car`);
      this.driverCar = res.data;
    } catch (e) {}
  }

  initAll({ driverId, month }) {
    this.getTravel({
      driverId,
      month
    });
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
}

export default new Data();
