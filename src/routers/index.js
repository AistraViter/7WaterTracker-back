import { Router } from 'express';

import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterNotesRouter } from './waterNotes.js';

const router = Router();
// Всі маршрути пишемо тут
router.use('/auth', authRouter);

router.use('/water-options', waterNotesRouter, usersRouter); // об'єднала маршрути

export default router;
