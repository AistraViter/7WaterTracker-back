import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createWaterSchema, updateWaterSchema } from '../validation/waterNotes.js';
import { authenticate } from '../middlewares/authenticate.js';
import { postWaterController, getWaterController, updateWaterController, deleteWaterController } from '../controllers/water.js';

export const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter
  .route('/note')
  .get(ctrlWrapper(getWaterController))
  .post(validateBody(createWaterSchema), ctrlWrapper(postWaterController));

waterRouter
  .route('/note/:id')
  .all(isValidId('id')) // Тут перевіряємо id запису води, а не userId // застосовується до всіх методів
  .patch(validateBody(updateWaterSchema), ctrlWrapper(updateWaterController))
  .delete(ctrlWrapper(deleteWaterController));

