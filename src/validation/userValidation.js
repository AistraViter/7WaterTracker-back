import Joi from 'joi';

// Схема для валидации данных регистрации пользователя
export const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

// Схема для валидации данных логина
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

// Схема для запроса сброса пароля (отправка email)
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Схема валидации для сброса пароля
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(), // Токен обязательно должен быть строкой
  password: Joi.string().min(8).max(64).required(), // Пароль должен быть строкой и иметь минимальную длину 6 символов
});
