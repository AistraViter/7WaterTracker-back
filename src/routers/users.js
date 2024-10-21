import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  editUserAvatarController,
  editUserInfoController,
  getUserInfoController,
  updateDailyNormController,
} from '../controllers/users.js';
import { updateUserEmailController } from '../controllers/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { editUserInfoSchema, updateDailyNormSchema } from '../validation/users.js';

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/', ctrlWrapper(getUserInfoController));
usersRouter.post('/email', ctrlWrapper(updateUserEmailController));
usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  ctrlWrapper(editUserAvatarController),
);

usersRouter.put(
  '/daily-norm',
  validateBody(updateDailyNormSchema),
  ctrlWrapper(updateDailyNormController),
);

usersRouter.put(
  '/',
  validateBody(editUserInfoSchema),
  ctrlWrapper(editUserInfoController),
);
