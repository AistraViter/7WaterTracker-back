import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { userId } = req.params;

  if (!isValidObjectId) {
    throw createHttpError(400, 'Bad request');
  }
  next();
};
