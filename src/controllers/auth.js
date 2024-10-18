import {
  loginUser,
  logoutUser,
  registrationUser,
  updateUserEmail,
} from '../services/auth.js';
import {
  accessTokenValidUntil,
  JWT_EXPIRES_IN,
  refreshTokenValidUntil,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} from '../constants/index.js';

import Session from '../db/models/session.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

export function createSession(user) {
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntilValue: accessTokenValidUntil,
    refreshTokenValidUntilValue: refreshTokenValidUntil,
  };
}

export function setRefreshTokenCookie(res, refreshToken) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
  });
}

export const registrationUserController = async (req, res) => {
  const newUser = await registrationUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};

export async function loginUserController(req, res, next) {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  await Session.deleteOne({ userId: user._id });

  const { accessToken, refreshToken } = createSession(user);

  // Создаем новую сессию и сохраняем её в базе данных
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  setRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: { accessToken },
  });
}

export async function logoutUserController(req, res, next) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token required');
  }

  await logoutUser(refreshToken);
  res.clearCookie('refreshToken');
  res.status(204).send();
}

export const updateUserEmailController = async (req, res) => {
  const { token } = req.query;

  const updatedUser = await updateUserEmail(token);

  res.status(200).json({
    status: 200,
    message: 'Email has been changed successfully',
    data: updatedUser,
  });
};
