import { observable, action } from 'mobx';
import { postJSON, auth } from '../../lib';
import { API_URL, TOKEN_NAME } from '../../config';

class Data {
  @observable name = '';
  @observable password = '';
  @observable errorPassword = '';
  @observable errorName = '';
  @observable loading = false;

  @action
  init() {
    this.name = '';
    this.password = '';
    this.errorPassword = '';
    this.errorName = '';
  }

  @action
  onChange(e) {
    const { value, name } = e.target;
    if (value === ' ') return;
    switch (name) {
      case 'name':
        this.errorName = '';
        this.name = value;

        break;
      case 'password':
        this.errorPassword = '';
        this.password = value;
        break;

      default:
        break;
    }
  }
  @action
  async onSubmit() {
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
      const res = await postJSON(`${API_URL}/signin`, obj);
      auth(res);
      this.loading = false;

      this.logIn = true;
    } catch (e) {
      this.errorName = e.name;
      this.errorPassword = e.password;
      this.loading = false;

      return;
    }
  }
}

export default new Data();
