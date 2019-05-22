import { observable, action, computed } from 'mobx';
import moment from 'moment';
import { getJSON } from '../../../lib';
import { API_URL } from '../../../config';

class Data {
  @observable id = null;
  @observable driver = { car: { name: '', number: '' }, name: '' };
  @observable date = moment(new Date());
  @observable travels = [];

  @action
  init({ id }) {
    this.id = id;
    this.getDriver();
    this.getTravel();
  }

  @action
  async getDriver() {
    try {
      const { data: driver } = await getJSON(
        `${API_URL}/admin/driver/${this.id}`
      );

      this.driver = driver;
    } catch (e) {}
  }

  @action
  async getTravel() {
    try {
      const { data } = await getJSON(
        `${API_URL}/admin/travel/driver/${
          this.id
        }/${this.date.month()}/${this.date.year()}`
      );
      this.travels = data;
    } catch (e) {}
  }

  @action _delete({ _id }) {
    this.travels = this.travels.filter(e => e._id !== _id);
  }
  @action put({ _id, newTravel }) {
    const date = new Date(newTravel.date);

    if (
      newTravel.driver._id === this.id &&
      date.getMonth() === this.date.month() &&
      date.getFullYear() === this.date.year()
    )
      this.travels = this.travels.map(e => (e._id === _id ? newTravel : e));
    else this.travels = this.travels.filter(e => e._id !== _id);
  }
  @action add({ newTravel }) {
    const date = new Date(newTravel.date);

    if (
      newTravel.driver._id === this.id &&
      date.getMonth() === this.date.month() &&
      date.getFullYear() === this.date.year()
    )
      this.travels = [...this.travels, newTravel];
  }

  @computed get receipt() {
    const res = [];
    this.travels.forEach(e => {
      if (e.partnerTo) {
        res.push({
          type: 'ذهاب',
          date: e.date,
          partner: e.partnerTo,
          total: e.totalTo,
          notes: e.notes
        });
      }

      if (e.partnerBack) {
        res.push({
          type: 'اياب',
          date: e.date,
          partner: e.partnerBack,
          total: e.totalBack,
          notes: e.notes
        });
      }
    });
    return res;
  }

  @computed get extraExpensesObj() {
    const res = [];
    this.travels.forEach(e => {
      Object.entries(e.expenses).forEach(exp => {
        if (exp[0] !== 'مصروف') {
          res.push({ date: e.date, type: exp[0], value: exp[1] });
        }
      });
    });
    return res;
  }

  @computed get receiptValue() {
    return this.receipt.reduce((a, b) => a + b.total, 0);
  }
  @computed get total() {
    return this.travels.reduce((a, b) => {
      return a + b.totalTo + b.totalBack - b.expenses['مصروف'];
    }, 0);
  }

  @computed get expenses() {
    return this.travels.reduce((a, b) => {
      return a + b.expenses['مصروف'];
    }, 0);
  }
  @computed get emptyTo() {
    return this.travels.reduce((a, b) => {
      const c = !b.totalTo ? 1 : 0;
      return a + c;
    }, 0);
  }
  @computed get emptyBack() {
    return this.travels.reduce((a, b) => {
      const c = !b.totalBack ? 1 : 0;
      return a + c;
    }, 0);
  }

  @computed get expensesMax() {
    return this.travels.reduce((a, b) => {
      // const c = Object.entries(b.expenses).reduce((_a, _b) => _a + _b[1], 0);
      const _c = b.expenses['مصروف'] > this.driver.car.expensesMax ? 1 : 0;

      return a + _c;
    }, 0);
  }

  @computed get extraExpenses() {
    return this.travels.reduce((a, b) => {
      const c = Object.entries(b.expenses).reduce((_a, _b) => {
        const _c = _b[0] === 'مصروف' ? 0 : _b[1];
        return _a + _c;
      }, 0);
      return a + c;
    }, 0);
  }
  @computed get totalWithotExpenses() {
    return this.travels.reduce((a, b) => {
      return a + b.totalTo + b.totalBack;
    }, 0);
  }

  @computed get payments() {
    return 0;
  }
}

export default new Data();
