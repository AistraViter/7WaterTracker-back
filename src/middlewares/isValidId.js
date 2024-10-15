import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { userId, waterId } = req.params;

  const idToCheck = userId || waterId;

  if (!isValidObjectId(idToCheck)) {
    throw createHttpError(400, 'Bad request');
  }

  next();
};
