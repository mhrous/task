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
      const { data } = await getJSON(`${API_URL}/admin/driver/${this.id}`);
      this.driver = data;
    } catch (e) {}
  }

  @action
  async getTravel() {
    try {
      const { data } = await getJSON(
        `${API_URL}/admin/travel/driver/${this.id}/${this.date.month()}`
      );
      this.travels = data;
    } catch (e) {}
  }

  @computed
  get getUnpaid() {
    return this.travels.filter(travel => travel.type) || [{}];
  }
  @computed
  get getPaid() {
    return this.travels.filter(travel => travel.type) || [{}];
  }
}

export default new Data();
