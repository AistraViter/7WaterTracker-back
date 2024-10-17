import { Router } from 'express';

import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterNotesRouter } from './waterNotes.js';
import { waterTodayRouter } from './waterToday.js';
import { waterMonthRouter } from './waterMonth.js';


const router = Router();
// Всі маршрути пишемо тут
router.use('/auth', authRouter);


router.use('/water', waterNotesRouter, waterMonthRouter); 

router.use('/', usersRouter); 


export default router;
