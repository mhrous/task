import { Router } from 'express';
import {
  getALLPartner,
  addNewPartner,
  getALLCar,
  addNewCar,
  getCar,
  getALLDriver,
  addNewDriver,
  getDriver,
  getAllTravelForCarInMonth,
  getAllTravelForDriverInMonth,
  updateUser
} from '../controllers';

const router = Router();

router.put('/admin/updata', updateUser);

router.get('/admin/partner', getALLPartner);
router.post('/admin/partner', addNewPartner);

router.get('/admin/car', getALLCar);
router.post('/admin/car', addNewCar);
router.get('/admin/car/:id', getCar);

router.get('/admin/driver', getALLDriver);
router.get('/admin/driver/:id', getDriver);
router.post('/admin/driver', addNewDriver);

router.get('/admin/travel/car/:carId/:month/:year', getAllTravelForCarInMonth);

router.get(
  '/admin/travel/driver/:driverId/:month/:year',
  getAllTravelForDriverInMonth
);

export default router;
