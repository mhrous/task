import {
  Router
} from 'express';
import {
  getALLPartner,
  addNewPartner,
  getALLCar,
  addNewCar,
  getALLDriver,
  addNewDriver,
  getDriver,
  getAllTravelForCarInMonth,
  getAllTravelForDriverInMonth
} from '../controllers';

const router = Router();

router.get('/admin/partner', getALLPartner);
router.post('/admin/partner', addNewPartner);

router.get('/admin/car', getALLCar);
router.post('/admin/car', addNewCar);

router.get('/admin/driver', getALLDriver);
router.get("/admin/driver/:id", getDriver)
router.post('/admin/driver', addNewDriver);

router.get(
  '/admin/travel/car/:carId/:month',
  getAllTravelForCarInMonth
);

router.get(
  '/admin/travel/driver/:driverId/:month',
  getAllTravelForDriverInMonth
);

export default router;