import { Router } from 'express';
import {
  getALLPartner,
  addNewPartner,
  getALLCar,
  addNewCar,
  getALLDriver,
  addNewDriver,
  getAllTravelForCarBetweenTwoDates,
  getAllTravelForDriverBetweenTwoDates
} from '../controllers';

const router = Router();

router.get('/admin/partner', getALLPartner);
router.post('/admin/partner', addNewPartner);

router.get('/admin/car', getALLCar);
router.post('/admin/car', addNewCar);

router.get('/admin/driver', getALLDriver);
router.post('/admin/driver', addNewDriver);

router.get(
  '/admin/travel/:carId/:start/:end',
  getAllTravelForCarBetweenTwoDates
);

router.get(
  '/admin/travel/:driverId/:start/:end',
  getAllTravelForDriverBetweenTwoDates
);

export default router;
