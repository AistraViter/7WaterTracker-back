import Joi from 'joi';

export const editUserInfoSchema = Joi.object({
  name: Joi.string().min(2).max(16).messages({
    'string.base': 'Name should be a string type',
    'string.min': 'Name should have at least 2 symbols',
    'string.max': 'Name should have max 16 symbols',
  }),
  gender: Joi.string()
    .valid('woman', 'man')
    .insensitive()
    .messages({ 'any.only': 'Gender should be "Woman" or "Man"' }),
  email: Joi.string().email().messages({
    'string.email': 'Please provide correct email',
  }),
  oldPassword: Joi.string().allow('').messages({
    'string.base': 'Old password should be a string type',
  }),
  password: Joi.string().allow('').messages({
    'string.base': 'Password should be a string type',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirmed password should match with original password',
  }),
});

export const updateDailyNormSchema = Joi.object({
  dailyNorm: Joi.number().integer().min(0).max(15000).messages({
    'number.base': 'Daily norma should be a number',
    'number.min': 'Daily norma should be a positive number',
    'number.max': 'Daily norma should not exceed 15000 ml',
  }),
  weight: Joi.number().integer().min(0).max(300).messages({
    'number.base': 'Weight should be a number',
    'number.min': 'Weight should be a positive number',
    'number.max': 'Weight should not exceed 300 kg',
  }),
  activeTime: Joi.number().integer().min(0).max(24).messages({
    'number.base': 'Active time should be a number',
    'number.min': 'Active time should be a positive number',
    'number.max': 'Active time should not exceed 24 hours',
  }),
});
