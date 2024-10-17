import { Router } from 'express';

import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterNotesRouter } from './waterNotes.js';
import { waterTodayRouter } from './waterToday.js';

const router = Router();
// Всі маршрути пишемо тут
router.use('/auth', authRouter);

router.use('/water', waterNotesRouter, usersRouter); // об'єднала маршрути
router.use('/today', waterTodayRouter);

export default router;
