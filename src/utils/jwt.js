import jwt from 'jsonwebtoken';

import { env } from './env.js';
import createHttpError from 'http-errors';

export const jwtSecret = env('JWT_SECRET');

export const createJwtToken = payload => jwt.sign(payload, jwtSecret, { expiresIn: '5m' });

export const verifyToken = (token) => {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (err) {
      if (err instanceof Error) throw createHttpError(401, err.message);
      throw err;
    }
  };
