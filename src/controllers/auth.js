import createHttpError from 'http-errors';
import {
  registrationUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  updateUserEmail,
} from '../services/auth.js';

import { refreshTokenValidUntil } from '../constants/index.js';

export function setRefreshTokenCookie(res, session) {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(refreshTokenValidUntil),
  };

  res.cookie('refreshToken', session.refreshToken, cookieOptions);
  res.cookie('sessionId', session._id, cookieOptions);
} //Дописала кукі сесії та додала термін дії  (AistraViter)

export const registrationUserController = async (req, res) => {
  const newUser = await registrationUser(req.body);
  const session = await loginUser(newUser.email, req.body.password);
  setRefreshTokenCookie(res, session);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      user: newUser,
      accessToken: session.accessToken,
    },
  });
};

export async function loginUserController(req, res, next) {
  const { email, password } = req.body;
  const { user, session } = await loginUser(email, password);

  setRefreshTokenCookie(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: { user, accessToken: session.accessToken },
  });
}

export async function logoutUserController(req, res, next) {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    throw createHttpError(401, 'Session ID required');
  }

  await logoutUser(sessionId);
  res.clearCookie('sessionId');
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
// Цей файл перевірено 20.10.2024 00.03 by AistraViter

export const refreshUserSessionController = async (req, res) => {
  const { user, updatedSession } = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setRefreshTokenCookie(res, updatedSession);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      user,
      accessToken: updatedSession.accessToken,
    },
  });
};
