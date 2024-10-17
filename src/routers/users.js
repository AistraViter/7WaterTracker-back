import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { UsersCollection } from '../db/models/users.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateDailyNormController } from '../controllers/users.js';

export const usersRouter = Router();

usersRouter.put(
  '/update-daily-norm/:userId',
  isValidId,
  ctrlWrapper(updateDailyNormController),
  validateBody(UsersCollection),
);

