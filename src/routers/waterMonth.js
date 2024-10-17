import express from 'express';
import { getMonthlyWaterConsumption } from '../controllers/waterMonth.js';

const router = express.Router();

router.get('/water-notes/:year/:month', getMonthlyWaterConsumption);

export default router;






