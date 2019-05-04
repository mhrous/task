import { observable, action } from 'mobx';
import { message } from 'antd';
import { getJSON, postJSON } from '../../../lib';
import { API_URL } from '../../../config';

class Data {
  @observable partners = [];
  @observable selectedPartner = {};
  //modal
  @observable openModal = false;
  @observable loadingModal = false;

  //form
  @observable partnerName = '';
  @observable partnerNameError = '';
  @observable partnerAddress = '';
  @observable partnerPhone = [['اساسي', '', '']];
  initAll() {
    this.getPartners();
  }

  @action
  initForm() {
    this.partnerName = '';
    this.partnerNameError = '';
    this.partnerAddress = '';
    this.partnerPhone = [['اساسي', '', '']];
  }

  @action
  closeModal() {
    this.openModal = false;
    this.initForm();
  }
  @action
  async okModal() {
    let error = false;
    if (this.partnerName === '') {
      this.partnerNameError = 'يجب عليك ادخال اسم الشريك';
      error = true;
    }
    const phone = {};
    this.partnerPhone.forEach(e => {
      const [key, value] = e;
      if (key in phone) {
        error = true;
        e[2] = 'هذا الرقم مضاف سابقا يرجى تغير الاسم';
        return;
      }
      if (key === '') {
        error = true;
        e[2] = 'لايمكن اضافة رقم من دون اسم';
        return;
      }
      if (value === '') {
        error = true;
        e[2] = 'لايمكن اضافة رقم فارغ';
        return;
      }
      phone[key] = value;
    });
    if (error) return;

    const obj = {
      phone,
      name: this.partnerName,
      address: this.partnersAddress || undefined
    };
    this.loadingModal = true;

    try {
      const { data } = await postJSON(`${API_URL}/admin/partner`, obj);
      this.initForm();
      this.partners = [...this.partners, data];
      this.loadingModal = false;
      this.openModal = false;
      message.success(`تم اضافة ${obj.name} `);
    } catch (e) {
      this.partnerNameError = e.name;
      this.loadingModal = false;
    }
  }

  @action addPhone() {
    // index 0 for key
    // index 1 for value
    // index 2 for error
    this.partnerPhone.push(['', '', '']);
  }
  @action
  removePhone(index) {
    this.partnerPhone.splice(index, 1);
  }

  @action
  onChange(e, index = 0) {
    const { name, value } = e.target;
    if (value === ' ') return;
    switch (name) {
      case 'name':
        this.partnerName = value;
        this.partnerNameError = '';
        break;
      case 'address':
        this.partnerAddress = value;
        break;
      case 'key':
        this.partnerPhone[index][0] = value;
        this.partnerPhone[index][2] = '';
        break;
      case 'value':
        this.partnerPhone[index][1] = value;
        this.partnerPhone[index][2] = '';

        break;
      default:
        break;
    }
  }

  @action
  async getPartners() {
    try {
      const res = await getJSON(`${API_URL}/admin/partner`);
      this.partners = res.data;
    } catch (e) {}
  }
}

export default new Data();
