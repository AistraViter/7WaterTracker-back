import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getWaterNotesController } from '../controllers/waterNotes.js';
import { waterNotesSchema } from '../validation/waterNotes.js';


export const waterNotesRouter = Router();

waterNotesRouter.get('/get-water',ctrlWrapper(getWaterNotesController), validateBody(waterNotesSchema));
// waterNotesRouter.post()
// waterNotesRouter.patch()
// waterNotesRouter.delete()
