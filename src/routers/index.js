import { Router } from 'express';
import userRouter from './users.js';
import authRouter from './auth.js';
import waterNoteRouter from './waterNotes.js';
import waterRateRouter from './waterRate.js';
import waterMonthRouter from './waterMonth.js';


const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/waterRate', waterRateRouter);
router.use('/waterNotes', waterNoteRouter);
router.use('/water_month', waterMonthRouter);

export default router;
