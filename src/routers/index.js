import { Router } from 'express';
<<<<<<< Updated upstream
=======

import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterNotesRouter } from './waterNotes.js';
import { waterTodayRouter } from './waterToday.js';
import { waterMonthRouter } from './waterMonth.js';
>>>>>>> Stashed changes

import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterNotesRouter } from './waterNotes.js';

const router = Router();
<<<<<<< Updated upstream
// Всі маршрути пишемо тут
=======

// router.use('/users', usersRouter);

>>>>>>> Stashed changes
router.use('/auth', authRouter);
router.use('/water', waterNotesRouter, waterMonthRouter, waterTodayRouter); 
router.use('/user', usersRouter); 

router.use('/water-options', waterNotesRouter, usersRouter); // об'єднала маршрути

export default router;
