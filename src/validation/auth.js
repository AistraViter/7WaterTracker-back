import Joi from 'joi';

// Схема для валидации данных регистрации пользователя
export const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

// Схема для валидации данных логина
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Цей файл перевірено 19.10.2024 22.07 by AistraViter
