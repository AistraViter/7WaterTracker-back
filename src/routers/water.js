import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { waterSchema, updateWaterSchema } from '../validation/waterNotes.js';
import { authenticate } from '../middlewares/authenticate.js';
import { postWaterController, getWaterController, updateWaterController, deleteWaterController } from '../controllers/water.js';

export const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.get(
  '/note',
  ctrlWrapper(getWaterController),

);
waterRouter.post(
  '/note',
  validateBody(waterSchema),
  ctrlWrapper(postWaterController),
);
waterRouter.patch(
  '/note/:id',
  isValidId('userId'),
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterController),
);
waterRouter.delete(
  '/note/:id',
  isValidId('userId'),
  ctrlWrapper(deleteWaterController),
);
