import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { UsersCollection } from '../db/models/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  editUserAvatarController,
  editUserInfoController,
  getUserInfoController,
  updateDailyNormController,
} from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { editUserInfoSchema } from '../validation/editUserInfoValidation.js';

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.put(
  // userId comes from the req.user._id parameter, which is provided by the authenticate.js middleware
  '/daily-norm',
  validateBody(UsersCollection),
  ctrlWrapper(updateDailyNormController),
);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  ctrlWrapper(editUserAvatarController),
);

usersRouter.get('/', ctrlWrapper(getUserInfoController));

usersRouter.patch(
  '/',
  validateBody(editUserInfoSchema),
  ctrlWrapper(editUserInfoController),
);
