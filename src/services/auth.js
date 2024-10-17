import { UsersCollection } from "../db/models/user.js";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const registrationUser = async ({ name, email, password, gender, photo }) => {
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
    photo
  });

  await newUser.save();

  return newUser;
};