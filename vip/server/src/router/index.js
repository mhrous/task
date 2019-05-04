import { Router } from 'express';
import admainRouter from './admin';
import { signUp, signIn, protect } from '../utils';
import userRouter from './user';

const router = Router();

router.use('/', userRouter);
router.post('/signUb', signUp);
router.post('/signIn', signIn);
//router.use(protect);
router.use('/', admainRouter);

export default router;
