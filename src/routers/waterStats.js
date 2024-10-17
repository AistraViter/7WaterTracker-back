import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getWaterStatsController } from '../controllers/waterStats.js';

export const waterStatsRouter = Router();

waterStatsRouter.get('/', ctrlWrapper(getWaterStatsController));
