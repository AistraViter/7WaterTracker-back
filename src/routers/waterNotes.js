import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { getWaterNotesController, createWaterNotesController, deleteWaterNotesController, patchWaterNotesController } from '../controllers/waterNotes.js';
import { waterNotesSchema, updateWaterNotesSchema } from '../validation/waterNotes.js';


export const waterNotesRouter = Router();

waterNotesRouter.get('/get-water', ctrlWrapper(getWaterNotesController), validateBody(waterNotesSchema));
waterNotesRouter.post('/post-water', ctrlWrapper(createWaterNotesController), validateBody(waterNotesSchema));
waterNotesRouter.patch('/update-water/:waterId', isValidId, ctrlWrapper(patchWaterNotesController), validateBody(updateWaterNotesSchema));
waterNotesRouter.delete('/delete-water/:waterId', isValidId, ctrlWrapper(deleteWaterNotesController));
