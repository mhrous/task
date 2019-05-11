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
}

export default new Data();
