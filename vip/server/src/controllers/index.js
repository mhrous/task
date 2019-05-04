import {
  getALLDriver,
  getALLDriverName,
  addNewDriver,
  getDriverWithCar
} from './driver';
import { getALLPartner, getALLPartnerName, addNewPartner } from './partner';
import { getALLCar, getALLCarNumberName, addNewCar } from './car';
import { getStatus, updateStatus } from './status';
import {
  getAllTravelForCarBetweenTwoDates,
  getDayTravel,
  addTravel,
  putTravel,
  deleteTravel,
  getAllTravelForDriverBetweenTwoDates
} from './travel';

export {
  getALLDriver,
  getALLDriverName,
  addNewDriver,
  getDriverWithCar,
  //
  getALLPartner,
  getALLPartnerName,
  addNewPartner,
  //
  getALLCar,
  getALLCarNumberName,
  addNewCar,
  //
  getStatus,
  updateStatus,
  //
  getAllTravelForCarBetweenTwoDates,
  getDayTravel,
  addTravel,
  putTravel,
  deleteTravel,
  getAllTravelForDriverBetweenTwoDates
};
