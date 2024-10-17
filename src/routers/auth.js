import { Router } from 'express';
import {
  registrationUserController,
  loginUserController,
  logoutUserController,
  sendResetEmailController,
  resetPasswordController} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js'; // Middleware для валидации тела запроса
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userLoginSchema,
  requestResetEmailSchema,
  userRegisterSchema,
  resetPasswordSchema
} from '../validation/user.js'; // Схемы валидации



export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema), // Це треба переробити в стилі як зроблено логін.
  ctrlWrapper(registrationUserController),
);

// Маршрут для логина пользователя
authRouter.post(
  '/login',
  validateBody(userLoginSchema), // Валидация тела запроса для логина
  ctrlWrapper(loginUserController), // Контроллер для логина
);


// Маршрут для логаута пользователя
authRouter.post('/logout', ctrlWrapper(logoutUserController)); // Добавляем контроллер для логаута

authRouter.post('/send-reset-email', ctrlWrapper(sendResetEmailController), validateBody(requestResetEmailSchema));

authRouter.post('/reset-password', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));


