import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getWaterTodayController } from '../controllers/waterToday.js';
import { authenticate } from '../middlewares/authenticate.js';

export const waterTodayRouter = Router();
waterTodayRouter.use(authenticate);

waterTodayRouter.get('/today', ctrlWrapper(getWaterTodayController));
