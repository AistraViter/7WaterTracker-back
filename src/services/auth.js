import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const registrationUser = async ({
  name,
  email,
  password,
  gender,
  photo,
}) => {
  const existingUser = await UsersCollection.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UsersCollection({
    name,
    email,
    password: hashedPassword,
    gender,
    photo,
  });

  await newUser.save();

  return newUser;
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
