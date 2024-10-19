import Joi from 'joi';

export const waterNotesSchema = Joi.object({
  waterVolume: Joi.number().integer().min(1).max(5000).required(),
  date: Joi.string().required(),
});

export const updateWaterNotesSchema = Joi.object({
  waterVolume: Joi.number().integer().min(1).max(5000),
  date: Joi.string(),
});
