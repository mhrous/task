import { Router } from 'express';
import {
  getALLPartnerName,
  getALLCarNumberName,
  getALLDriverName,
  getStatus,
  updateStatus,
  getDayTravel,
  addTravel,
  putTravel,
  deleteTravel,
  getDriverWithCar
} from '../controllers';

const router = Router();

router.get('/partner', getALLPartnerName);
router.get('/car', getALLCarNumberName);
router.get('/driver', getALLDriverName);
router.get('/status', getStatus);
router.put('/status/:id', updateStatus);
router.get('/travel', getDayTravel);
router.post('/travel', addTravel);
router.put('/travel/:id', putTravel);
router.delete('/travel/:id', deleteTravel);
router.get('/driver/car', getDriverWithCar);

export default router;
