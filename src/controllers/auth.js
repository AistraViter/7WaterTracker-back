import {
  loginUser,
  logoutUser,
  registrationUser,
  updateUserEmail,
} from '../services/auth.js';

import createHttpError from 'http-errors';

export function setRefreshTokenCookie(res, session) {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
  });
}

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

  const session = await loginUser(email, password);

  setRefreshTokenCookie(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: { accessToken: session.accessToken },
  });
}

export async function logoutUserController(req, res, next) {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(401, 'Refresh token required');
  }

  await logoutUser(refreshToken);
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

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
