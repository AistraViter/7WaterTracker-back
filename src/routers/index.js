import { Router } from 'express';
import {usersRouter} from './users.js';
import { authRouter } from './auth.js';
import waterMonthRouter from './waterMonth.js';


const router = Router();

router.use('/', usersRouter);
router.use('/auth', authRouter);
router.use('/water_month', waterMonthRouter);


export default router;
