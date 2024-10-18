
import { UsersCollection } from "../db/models/user.js";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { env } from "../utils/env.js";
import { TEMPLATES_DIR } from "../constants/index.js";
import { sendEmail } from "../utils/sendEmail.js";
import { createJwtToken, verifyToken } from "../utils/jwt.js";


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

export const sendResetUser = async (email) => {
  const user = await User.findOne({email});

    if (!user) {
      throw createHttpError(404, 'User not found');
    };

    const resetToken = createJwtToken({sub: user._id, email,});
    console.log(resetToken);

    const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, 'send-reset-email.html');

    const templateSource = (await fs.readFile(resetPasswordTemplatePath)).toString();

    const template = handlebars.compile(templateSource);
    const html = template({
      name: user.name,
      link: `${env('APP_DOMAIN')}/auth/send-reset-email?token=${resetToken}`,
    });

    const emailSent = await sendEmail({
      to: email,
      subject: "Reset your password",
      html,
    });

    if (!emailSent) {
      throw createHttpError(500, 'Failed to send the email, please try again later.');
    }
};

export const resetPassword = async (payload) => {
  const entries = verifyToken(payload.token);

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
