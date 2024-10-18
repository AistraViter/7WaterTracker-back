import Joi from 'joi';

// Схема для валидации данных регистрации пользователя
export const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

// Схема для валидации данных логина
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});
