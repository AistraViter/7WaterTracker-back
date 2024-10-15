import Joi  from 'joi';
import  createHttpError from 'http-errors';

const registerValidationSchema = Joi.object({
  name: Joi.string().min(8).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().valid('Woman', 'Man').required(),
  photo: Joi.string().allow(null).optional(),
});

export const validateRegistrationData = (req, res, next) => {
  const { error } = registerValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    return next(createHttpError(400, errorMessage));
  }

  next();
};
