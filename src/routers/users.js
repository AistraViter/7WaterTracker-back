import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { UsersCollection } from '../db/models/user.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateDailyNormController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

export const usersRouter = Router();

usersRouter.put(
  // userId comes from the req.user._id parameter, which is provided by the authenticate.js middleware
  '/daily-norm',
  isValidId('userId'),
  authenticate,
  validateBody(UsersCollection),
  ctrlWrapper(updateDailyNormController),
);
