import {
  getALLDriver,
  getALLDriverName,
  addNewDriver,
  getDriverWithCar,
  getDriver
} from './driver';

import { getALLPartner, getALLPartnerName, addNewPartner } from './partner';

import { getALLCar, getALLCarNumberName, addNewCar, getCar } from './car';
import { getStatus, updateStatus } from './status';

import {
  addPayment,
  deletePayment,
  putPayment,
  getAllPaymentForDriverInMonth
} from './payments';

import {
  getAllTravelForCarInMonth,
  getDayTravel,
  addTravel,
  putTravel,
  deleteTravel,
  getAllTravelForDriverInMonth
} from './travel';

import { updateUser } from './user';

export {
  getALLDriver,
  getALLDriverName,
  addNewDriver,
  getDriverWithCar,
  getDriver,
  //
  getALLPartner,
  getALLPartnerName,
  addNewPartner,
  //
  getALLCar,
  getCar,
  getALLCarNumberName,
  addNewCar,
  //
  getStatus,
  updateStatus,
  //
  getAllTravelForCarInMonth,
  getDayTravel,
  addTravel,
  putTravel,
  deleteTravel,
  getAllTravelForDriverInMonth,
  //
  updateUser,
  //
  addPayment,
  deletePayment,
  putPayment,
  getAllPaymentForDriverInMonth
};
