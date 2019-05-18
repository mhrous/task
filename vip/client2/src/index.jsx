import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import ar_EG from 'antd/lib/locale-provider/ar_EG';

import './index.css';
import App from './App';
import { TOKEN_NAME } from './config';
import User from './User';

const TOKEN = localStorage.getItem(TOKEN_NAME);
TOKEN ? User.logIn({ TOKEN }) : User.logOut({});

ReactDOM.render(
  <LocaleProvider locale={ar_EG}>
    <App />
  </LocaleProvider>,
  document.getElementById('root')
);
