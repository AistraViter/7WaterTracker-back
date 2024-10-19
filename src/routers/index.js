import { Router } from 'express';
import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterNotesRouter } from './waterNotes.js';
import { waterTodayRouter } from './waterToday.js';
import { waterMonthRouter } from './waterMonth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/water', waterNotesRouter, waterMonthRouter, waterTodayRouter);
router.use('/user', usersRouter);

export default router;
