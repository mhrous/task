import { observable, action } from 'mobx';
import { getJSON } from '../../../lib';
import { API_URL } from '../../../config';

class Data {
  @observable cars = [];

  init() {
    this.getCars();
  }

  @action
  async getCars() {
    try {
      const { data } = await getJSON(`${API_URL}/admin/car`);
      this.cars = data;
    } catch (e) {}
  }

  @action _delete({ _id }) {
    // this.travels = this.travels.filter(e => e._id !== _id);
  }
  @action put({ _id, newTravel }) {
    // this.travels = this.travels.map(e => (e._id === _id ? newTravel : e));
  }
  @action add({ newCar }) {
    this.cars = [...this.cars, newCar];
  }
}

export default new Data();
