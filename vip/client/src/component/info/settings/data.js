import { observable, action } from 'mobx';
import { message } from 'antd';
import User from '../../../User';

import { putJSON } from '../../../lib';
import { API_URL } from '../../../config';

class Data {
  @observable name = User.name;
  @observable password = '';
  @observable errorPassword = '';
  @observable errorName = '';
  @observable loading = false;

  @action
  init() {
    this.name = User.name;
    this.password = '';
    this.errorPassword = '';
    this.errorName = '';
  }

  @action
  async changedUserInfo() {
    if (this.name.length < 4) {
      this.errorName = 'اسم المستخدم قصير جدا';
    } else if (this.name.length > 50) {
      this.errorName = 'اسم المستخدم طويل جدا';
    }
    if (this.password.length < 4) {
      this.errorPassword = 'كلمة السر قصير جدا';
    } else if (this.password.length > 50) {
      this.errorPassword = 'كلمة السر طويل جدا';
    }
    if (!this.name.length) {
      this.errorName = 'يرجى ادخال اسم المستخدم';
    }
    if (!this.password.length) {
      this.errorPassword = 'يرجى ادخال كلمة السر';
    }

    if (
      this.name.length < 4 ||
      this.name.length > 50 ||
      this.password.length < 4 ||
      this.password.length > 50
    )
      return;
    this.loading = true;
    const obj = { name: this.name, password: this.password };
    try {
      const { data } = await putJSON(`${API_URL}/admin/updata`, obj);
      message.success('تم التغير بنجاح');
      User.name = data.name;
      this.loading = false;
    } catch (e) {
      this.errorName = e.name;
      this.errorPassword = e.password;
      this.loading = false;

      return;
    }
  }
}

export default new Data();
