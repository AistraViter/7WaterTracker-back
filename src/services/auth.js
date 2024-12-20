import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import {
  accessTokenValidUntil,
  refreshTokenValidUntil,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../constants/index.js';
import SessionsCollection from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export function createSession(user) {
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  console.log('Generated new accessToken:', accessToken); // Логування accessToken
  console.log('Generated new refreshToken:', refreshToken); // Логування refreshToken

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntilValue: accessTokenValidUntil,
    refreshTokenValidUntilValue: refreshTokenValidUntil,
  };
}

export const registrationUser = async (userData) => {
  const existingUser = await UsersCollection.findOne({ email: userData.email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const nameFromEmail = userData.email.split('@')[0];

  const newUser = await UsersCollection.create({
    ...userData,
    password: hashedPassword,
    name: nameFromEmail,
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Incorrect email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Incorrect email or password');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const { accessToken, refreshToken } = createSession(user);

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { user, session };
};

export const logoutUser = async (refreshToken) => {
  await SessionsCollection.deleteOne({ refreshToken });
};

export const updateUserEmail = async (token) => {
  let entries;

  try {
    entries = jwt.verify(token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
  }

  const user = await UsersCollection.findOneAndUpdate(
    {
      _id: entries.sub,
    },
    { email: entries.email },
    { new: true },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};

// Цей файл перевірено 19.10.2024 22.50 by AistraViter

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  // Створення нових токенів
  const { accessToken, refreshToken: newRefreshToken } = createSession({
    _id: session.userId,
  });

  // Оновлення сесії в базі даних
  const updatedSession = await SessionsCollection.findOneAndUpdate(
    { _id: sessionId },
    {
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenValidUntil,
      refreshTokenValidUntil,
    },
    { new: true }, // Повернути оновлений документ
  );

  return updatedSession;
};
