import { observable, action } from 'mobx';
import { getJSON } from '../../../lib';
import { API_URL } from '../../../config';

class Data {
  @observable travels = [];

  init() {
    this.getTravel();
  }

  @action
  async getTravel() {
    try {
      const { data } = await getJSON(`${API_URL}/travel`);
      this.travels = data;
    } catch (e) {}
  }
  @action _delete({ _id }) {
    this.travels = this.travels.filter(e => e._id !== _id);
  }
  @action put({ _id, newTravel }) {
    this.travels = this.travels.map(e => (e._id === _id ? newTravel : e));
  }
  @action add({ newTravel }) {
    this.travels = [...this.travels, newTravel];
  }
}

export default new Data();
