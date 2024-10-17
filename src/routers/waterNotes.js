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
  validateBody(waterNotesSchema),
);
waterNotesRouter.post(
  '/note',
  ctrlWrapper(createWaterNotesController),
  validateBody(waterNotesSchema),
);
waterNotesRouter.patch(
  '/note/:waterId',
  isValidId,
  ctrlWrapper(patchWaterNotesController),
  validateBody(updateWaterNotesSchema),
);
waterNotesRouter.delete(
  '/note/:waterId',
  isValidId,
  ctrlWrapper(deleteWaterNotesController),
);
