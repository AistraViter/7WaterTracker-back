import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  getWaterNotesController,
  createWaterNotesController,
  deleteWaterNotesController,
  patchWaterNotesController,
} from '../controllers/waterNotes.js';
import {
  waterNotesSchema,
  updateWaterNotesSchema,
} from '../validation/waterNotes.js';
import { authenticate } from '../middlewares/authenticate.js';

export const waterNotesRouter = Router();

waterNotesRouter.use(authenticate);

waterNotesRouter.get(
  '/note',
  ctrlWrapper(getWaterNotesController),
);
waterNotesRouter.post(
  '/note',
  validateBody(waterNotesSchema),
  ctrlWrapper(createWaterNotesController),
);
waterNotesRouter.patch(
  '/note/:waterId',
  isValidId('waterId'),
  validateBody(updateWaterNotesSchema),
  ctrlWrapper(patchWaterNotesController),
);
waterNotesRouter.delete(
  '/note/:waterId',
  isValidId('waterId'),
  ctrlWrapper(deleteWaterNotesController),
);

