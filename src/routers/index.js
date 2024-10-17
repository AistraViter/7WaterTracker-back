import { Router } from 'express';
import { usersRouter } from './users.js';
import { authRouter } from './auth.js';
import { waterNotesRouter } from './waterNotes.js';
import { getMonthlyWaterConsumptionController } from '../controllers/waterMonth.js';


const router = Router();
// Всі маршрути пишемо тут
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/water-options', waterNotesRouter, usersRouter); // об'єднала маршрути
// Маршрут для отримання місячного споживання води
router.get('/water-consumption/month/:year/:month', getMonthlyWaterConsumptionController);

export default router;
