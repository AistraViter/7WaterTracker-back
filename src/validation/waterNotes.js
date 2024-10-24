import Joi from 'joi';
import createHttpError from 'http-errors';

// Базова схема для води
const baseWaterSchema = Joi.object({
  dailyNorm: Joi.number().integer().max(15000),
  waterVolume: Joi.number().integer().min(1).max(5000).required().messages({
    'number.base': 'Enter the correct amount of water format (number).',
    'number.min': 'Enter the correct amount of water format (number).',
    'number.max': 'The maximum amount of water is 5000 ml.',
  }),
  time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      'string.pattern.base': 'Enter the correct time format (HH:mm).',
      'string.empty': 'Time is required.',
    }),
  date: Joi.date().required().messages({
    'date.base': 'Enter the correct date format (YYYY-MM-DD).',
    'any.required': 'Date is required.',
  }),
});

// Об'єднання дати та часу в один об'єкт Date
export const combineDateAndTime = (dateString, timeString) => {
  const combinedDateTime = new Date(`${dateString}T${timeString}:00+03:00`);

  if (isNaN(combinedDateTime.getTime())) {
    throw createHttpError(400, 'Invalid date or time.');
  }

  combinedDateTime.setHours(combinedDateTime.getHours() + 0);

  return combinedDateTime;
};

// Схема для створення запису про воду
export const createWaterSchema = baseWaterSchema;

// Схема для оновлення запису про воду (робимо поля необов'язковими)
export const updateWaterSchema = baseWaterSchema.fork(
  ['dailyNorm', 'waterVolume', 'time', 'date'],
  (field) => field.optional(),
);

const waterForMonthSchema = Joi.object({
  month: Joi.number().min(1).max(12).required().messages({
    'number.base': 'month should be number',
    'number.min': 'month should be greater than or equal to 1',
    'number.max': 'month should be less than or equal to 12',
    'any.required': 'Month is required',
  }),
  year: Joi.number()
    .integer()
    .min(2000)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'number.base': 'Year should be a number',
      'number.integer': 'Year should be an integer',
      'number.min': 'Year should be greater than or equal to 2000',
      'number.max': `Year should be less than or equal to ${new Date().getFullYear()}`,
      'any.required': 'Year is required',
    }),
});

export const validateQueryWaterMonth = (req, res, next) => {
  const queryParams = {
    month: req.query.month || req.body.month,
    year: req.query.year || req.body.year,
  };

  const { error } = waterForMonthSchema.validate(queryParams);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: 'BadRequestError',
      data: error.details,
    });
  }

  next();
};
