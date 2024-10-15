import { Router } from 'express';
import { validateRegistrationData } from '../middlewares/validateRegistrationData.js';
import { registrationUserController } from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/registration',
  validateRegistrationData,
  registrationUserController,
);
