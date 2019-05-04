import { observable, action, toJS, computed } from 'mobx';
import { getJSON, putJSON } from '../../../lib';
import { API_URL } from '../../../config';

class Data {
  @observable driverStatus = [];
  @observable sortKey = '';
  @observable sortType = '';

  init() {
    this.getDriverStatus();
  }
  @action
  async onChange(id, type, value) {
    const changed = this.driverStatus.find(e => e._id === id);
    changed[type] = value;
    const newState = toJS(this.driverStatus);
    this.driverStatus = newState;
    const obj = {};
    obj[type] = value;
    try {
      await putJSON(`${API_URL}/status/${id}`, obj);
    } catch (e) {}
  }

  @action
  async getDriverStatus() {
    try {
      const res = await getJSON(`${API_URL}/status`);
      this.driverStatus = res.data;
    } catch (e) {}
  }

  @computed
  get tableData() {
    switch (this.sortKey) {
      case 'name':
        if (this.sortType === 'ascend') {
          return this.driverStatus.sort((a, b) => {
            const aName = a.driver.name;
            const bName = b.driver.name;
            return aName.localeCompare(bName) === 1;
          });
        } else {
          return this.driverStatus.sort((a, b) => {
            const aName = a.driver.name;
            const bName = b.driver.name;
            return aName.localeCompare(bName) === 1 ? -1 : 1;
          });
        }
      case 'place':
        if (this.sortType === 'ascend') {
          return this.driverStatus.sort((a, b) => {
            const aPlace = a.place;
            const bPlace = b.place;
            if (aPlace === '') return 1;
            return aPlace.localeCompare(bPlace) === 1;
          });
        } else {
          return this.driverStatus.sort((a, b) => {
            const aPlace = a.place;
            const bPlace = b.place;
            return aPlace.localeCompare(bPlace) === 1 ? -1 : 1;
          });
        }
      case 'go':
        if (this.sortType === 'ascend') {
          return this.driverStatus.sort((a, b) => (a.go ? -1 : 1));
        } else {
          return this.driverStatus.sort((a, b) => (a.go ? 1 : -1));
        }

      case 'back':
        if (this.sortType === 'ascend') {
          return this.driverStatus.sort((a, b) => (a.back ? -1 : 1));
        } else {
          return this.driverStatus.sort((a, b) => (a.back ? 1 : -1));
        }
      default:
        return this.driverStatus;
    }
  }
}

export default new Data();
