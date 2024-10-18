import Joi from 'joi';

export const waterNotesSchema = Joi.object({
  waterVolume: Joi.number().integer().min(1).max(5000).required(),
  date: Joi.date(),
});

export const updateWaterNotesSchema = Joi.object({
  waterVolume: Joi.number().integer().min(1).max(5000),
  date: Joi.date(),
});

export const waterForMonthSchema = Joi.object({
  month: Joi.number().min(1).max(12).required().messages({
    'number.base': 'month should be number',
    'number.min': 'month should be greater than or equal to 1',
    'number.max': 'month should be less than or equal to 12',
    'any.required': 'Month is required',
  }),
});
