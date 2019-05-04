import { observable, action, computed } from 'mobx';
import { getJSON } from '../lib';
import { API_URL } from '../config';

class Home {
  @observable dataDriverTabel = [];

  @action
  async getDriversInfo() {
    try {
      const res = await getJSON(`${API_URL}/driver`);
      this.dataDriverTabel = res.data;
    } catch (e) {}
  }
  @computed
  get DriverTabelInfo() {
    return this.dataDriverTabel;
  }
}

export default new Home();
