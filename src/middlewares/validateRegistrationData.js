import  createHttpError from 'http-errors';

export const validateRegistrationData = (schema) = async(req, res, next) => {
  const { error } = schema.validate(req.body, {
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
