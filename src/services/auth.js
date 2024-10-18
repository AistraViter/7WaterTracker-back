import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import Session from '../db/models/session.js';

export const registrationUser = async (userData) => {
  const existingUser = await UsersCollection.findOne({ email: userData.email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const newUser = await UsersCollection.create({
    ...userData,
    password: hashedPassword,
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

  return user;
};

export const logoutUser = async (refreshToken) => {
  await Session.deleteOne({ refreshToken });
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
