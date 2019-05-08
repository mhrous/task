import { observable, action } from 'mobx';
import { getJSON } from '../../../lib';

class Data {
  @observable id = null;

  @action
  init({ id }) {
    this.id = id;
  }

  @action
  getDriver() {
    try {
    } catch (e) {}
  }
}

export default new Data();
