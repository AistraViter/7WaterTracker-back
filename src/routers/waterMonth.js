import { Router } from 'express';
import { getWaterMonthController } from '../controllers/waterMonth.js';

export const waterMonthRouter = Router();

// Маршрут для отримання місячного споживання води
  waterMonthRouter.get('/month', getWaterMonthController);
