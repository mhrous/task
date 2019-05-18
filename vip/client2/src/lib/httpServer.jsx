import axios from 'axios';

import { API_URL } from '../config';

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
    url: `${API_URL}${url}`,
    headers
  };
  return reduceRequest(config);
};

export const postJSON = (url, data = {}, headers = {}) => {
  const config = {
    method: 'POST',
    url: `${API_URL}${url}`,
    data,
    headers
  };
  return reduceRequest(config);
};

export const putJSON = (url, data = {}, headers = {}) => {
  const config = {
    method: 'PUT',
    url: `${API_URL}${url}`,
    data,
    headers
  };
  return reduceRequest(config);
};

export const deleteJSON = (url, headers = {}) => {
  const config = {
    method: 'DELETE',
    url: `${API_URL}${url}`,
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
