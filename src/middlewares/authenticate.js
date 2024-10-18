import createHttpError from 'http-errors';
import Session from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];
    const session = await Session.findOne({ accessToken: token });

    if (!session) {
      next(createHttpError(401, 'Session not found'));
      return;
    }

    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      next(createHttpError(401, 'Access token expired'));
    }

    const user = await UsersCollection.findOne({ _id: session.userId });

    if (!user) {
      next(createHttpError(401, 'Session for user not found'));
      return;
    }

    req.user = { _id: user._id };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(createHttpError(401, 'Access token expired'));
    } else {
      next(createHttpError(401, 'Invalid or expired access token'));
    }
  }
};
