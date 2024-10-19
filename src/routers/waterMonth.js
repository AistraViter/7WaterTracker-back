import { Router } from 'express';
import { getWaterForMonthController } from '../controllers/water.js';

const waterMonthRouter = Router();

// Define a specific path for the month route
waterMonthRouter.get('/month', getWaterForMonthController);

export { waterMonthRouter };


