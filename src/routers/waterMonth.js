<<<<<<< Updated upstream
<<<<<<< HEAD
import express from 'express';
import { getMonthlyWaterConsumptionController } from '../controllers/waterMonth.js';

const router = express.Router();

// Маршрут для отримання місячного споживання води
router.get('/water-consumption', getMonthlyWaterConsumptionController);

export default router;
=======
import express from 'express';
import { getMonthlyWaterConsumptionController } from '../controllers/waterMonth.js';

const router = express.Router();

// Маршрут для отримання місячного споживання води
router.get('/water-consumption', getMonthlyWaterConsumptionController);

export default router;
>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
=======
import { Router } from 'express';
import { getWaterMonthController } from '../controllers/waterMonth.js';

export const waterMonthRouter = Router();

// Маршрут для отримання місячного споживання води
  waterMonthRouter.get('/month', getWaterMonthController);

>>>>>>> Stashed changes
