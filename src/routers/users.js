import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { UsersCollection } from '../db/models/user.js';
// import { User } from '../db/models/user.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateDailyNormController } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';

export const usersRouter = Router();

usersRouter.put(
  // userId comes from the req.user._id parameter, which is provided by the authenticate.js middleware
  '/update-daily-norm',
  isValidId('userId'),
  authenticate,
  ctrlWrapper(updateDailyNormController),
  validateBody(UsersCollection),
);
