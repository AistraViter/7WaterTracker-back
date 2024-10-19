import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
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
import { updateDailyNormSchema } from '../validation/editUserInfoValidation.js';

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.put(
  // userId comes from the req.user._id parameter, which is provided by the authenticate.js middleware
  '/daily-norm',
  validateBody(updateDailyNormSchema),
  ctrlWrapper(updateDailyNormController),
);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  ctrlWrapper(editUserAvatarController),
);

usersRouter.get('/', ctrlWrapper(getUserInfoController));

usersRouter.put(
  '/',
  validateBody(editUserInfoSchema),
  ctrlWrapper(editUserInfoController),
);
