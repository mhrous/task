import axios from 'axios';
import appData from './data';

export const reduceRequest = config => {
  return axios(config)
    .then(({ data }) => Promise.resolve(data))
    .catch(error => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    });
};

export const getJSON = (url, headers = {}) => {
  const config = {
    method: 'GET',
    url: `${appData.API_URL}${url}`,
    headers
  };
  return reduceRequest(config);
};

export const postJSON = (url, data = {}, headers = {}) => {
  const config = {
    method: 'POST',
    url: `${appData.API_URL}${url}`,
    data,
    headers
  };
  return reduceRequest(config);
};

export const putJSON = (url, data = {}, headers = {}) => {
  const config = {
    method: 'PUT',
    url: `${appData.API_URL}${url}`,
    data,
    headers
  };
  return reduceRequest(config);
};

export const deleteJSON = (url, headers = {}) => {
  const config = {
    method: 'DELETE',
    url: `${appData.API_URL}${url}`,
    headers
  };
  return reduceRequest(config);
};

export const auth = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const PAGE_NAME = {
  car: 'CAR',
  allCars: 'ALL_CARS',
  partner: 'PARTNER',
  allPartner: 'ALL_PARTNER',
  driver: 'DRIVER',
  allDriver: 'ALL_DRIVER',
  settings: 'SETTINGS',
  daily: 'DAILY',
  status: 'STATUS',
  receipts: 'RECEIPTS'
};

export const tableConfig = {
  searching: false,
  scrollCollapse: false,
  paging: false,
  responsive: true,
  fixedHeader: true,
  info: false
};

export const emptyTableRender = () => {
  const str = `<div class="ui placeholder segment">
  <div class="ui icon header">
    <i class="table icon"></i>
    هذا الجدول فارغ
  </div>

</div>`;
  $('.dataTables_empty').html(str);
};

export const connectInputNodeWithValueInsideObject = (node, obj, valueName) => {
  node.on('blur', function() {
    obj[valueName] = $(this).val();
    $(this)
      .parent()
      .removeClass('error');
  });
};

export const addError = node => {
  node.parent().addClass('error');
};

export const restNodeInput = arrayOfNode =>
  arrayOfNode.forEach(node => {
    node.parent().removeClass('error');
    node.val('');
  });

export const emptyObj = obj => {
  for (let k in obj) {
    delete obj[k];
  }
};
