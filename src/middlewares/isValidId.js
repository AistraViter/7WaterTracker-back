import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (...params) => {
  return (req, res, next) => {
    for (const param of params) {
      console.log('From isValidId >> req.params[param]: ', req.params[param]);

      const idToCheck = req.params[param];

      if (idToCheck && !isValidObjectId(idToCheck)) {
        throw createHttpError(400, 'Bad request');
      }

      next();
    }
  };
};
