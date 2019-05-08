import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LocaleProvider } from 'antd';
import ar_EG from 'antd/lib/locale-provider/ar_EG';

ReactDOM.render(
  <LocaleProvider locale={ar_EG}>
    <App />
  </LocaleProvider>,
  document.getElementById('root')
);
