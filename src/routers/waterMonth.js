import express from 'express';
import { getMonthlyWaterConsumptionController } from '../controllers/waterMonth.js';

const router = express.Router();

// Маршрут для отримання місячного споживання води
router.get('/water-consumption', getMonthlyWaterConsumptionController);

export default router;
