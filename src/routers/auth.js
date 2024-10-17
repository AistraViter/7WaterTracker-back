import { Router } from 'express';
import { validateRegistrationData } from '../middlewares/validateRegistrationData.js';
import { registrationUserController } from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
<<<<<<< Updated upstream
  '/registration',
  validateRegistrationData,
=======
  '/register',
  validateRegistrationData, // Це треба переробити в стилі як зроблено логін. 
>>>>>>> Stashed changes
  registrationUserController,
);
