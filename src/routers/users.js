import { Router } from 'express';

import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateDailyNormController } from '../controllers/users.js';

const router = Router();

router.put(
  '/update-daily-norm/:userId',
  isValidId,
  ctrlWrapper(updateDailyNormController),
);

export default router;
