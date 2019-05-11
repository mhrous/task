import express from 'express';
import {
  json,
  urlencoded
} from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import config from './config';
import {
  connect
} from './utils';
import vipRouter from './router';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use('/vip', vipRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/vip`);
    });
  } catch (e) {}
};