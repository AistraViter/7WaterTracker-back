import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
<<<<<<< Updated upstream
import { getWaterNotesController, createWaterNotesController, deleteWaterNotesController, patchWaterNotesController } from '../controllers/waterNotes.js';
import { waterNotesSchema, updateWaterNotesSchema } from '../validation/waterNotes.js';
import { authenticate } from '../middlewares/authenticate.js';



=======
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
>>>>>>> Stashed changes

export const waterNotesRouter = Router();

waterNotesRouter.use(authenticate);

<<<<<<< Updated upstream
waterNotesRouter.get('/get-water', ctrlWrapper(getWaterNotesController), validateBody(waterNotesSchema));
waterNotesRouter.post('/post-water', ctrlWrapper(createWaterNotesController), validateBody(waterNotesSchema));
waterNotesRouter.patch('/update-water/:waterId', isValidId, ctrlWrapper(patchWaterNotesController), validateBody(updateWaterNotesSchema));
waterNotesRouter.delete('/delete-water/:waterId', isValidId, ctrlWrapper(deleteWaterNotesController));
=======
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
>>>>>>> Stashed changes
