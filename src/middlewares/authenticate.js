import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

const jwtSecret = env('JWT_SECRET');

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);

    req.user = { _id: decoded.userId };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(createHttpError(401, 'Access token expired'));
    } else {
      next(createHttpError(401, 'Invalid or expired access token'));
    }
  }
};
