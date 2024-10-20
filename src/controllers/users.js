import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import handlebars from 'handlebars';
import {
  updateUserById,
  getUserById,
  updateUserDailyNorm,
} from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { TEMPLATES_DIR } from '../constants/index.js';
import { env } from '../utils/env.js';
import { createJwtToken } from '../utils/jwt.js';
import { sendEmail } from '../utils/sendEmail.js';
import { WaterCollection } from '../db/models/water.js';

//////////////////////////////// updateDailyNorm ////////////////////////////////
export const updateDailyNormController = async (req, res, next) => {
  const userId = req.user._id;
  const { dailyNorm } = req.body;

  const user = await getUserById(userId);
  if (!user) {
    return next(createHttpError(404, 'User is not found'));
  }

  try {
    const updatedUser = await updateUserDailyNorm(userId, dailyNorm);

    await WaterCollection.updateMany(
      { userId: userId }, // Усі записи цього користувача
      { $set: { dailyNorm: dailyNorm } }, // Оновлюємо dailyNorm
    );

    res.json({
      message: 'Daily water norm updated successfully',
      dailyNorm: updatedUser.dailyNorm,
    });
  } catch (error) {
    return next(createHttpError(500, error));
  }
};

//////////////////////////////// editUserAvatarController ////////////////////////////////
export const editUserAvatarController = async (req, res, next) => {
  const { _id } = req.user;
  const avatar = req.file;
  const photoUrl = await saveFileToCloudinary(avatar, 'final-project');

  const result = await updateUserById(_id, { photo: photoUrl });
  if (!result) return next(createHttpError(404, 'User not found'));

  res.status(200).json({
    status: 200,
    message: 'User`s photo has been updated successfully',
  });
};

//////////////////////////////// getUserInfoController ////////////////////////////////
export const getUserInfoController = async (req, res, next) => {
  const { _id } = req.user;

  const user = await getUserById(_id);
  if (!user) return next(createHttpError(404, 'User not found'));

  res.status(200).json({
    status: 200,
    message: 'User has been found successfully',
    data: user,
  });
};

//////////////////////////////// editUserInfoController ////////////////////////////////
export const editUserInfoController = async (req, res, next) => {
  const { _id } = req.user;
  const { password, confirmPassword, oldPassword } = req.body;
  const { name, gender, email } = req.body;

  const user = await getUserById(_id);
  if (!user) return next(createHttpError(404, 'User not found'));

  let dataToUpdate = {};

  if (
    oldPassword.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0
  ) {
    const isCurrentPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      return next(createHttpError(400, 'Old password is incorrect'));
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);
    dataToUpdate.password = hashedNewPassword;
  }

  if (email !== user.email) {
    const resetToken = createJwtToken({ sub: user._id, email });

    const changeEmailTemplatePath = path.join(
      TEMPLATES_DIR,
      'send-change-email.html',
    );
    const templateSource = (
      await fs.readFile(changeEmailTemplatePath)
    ).toString();
    const template = handlebars.compile(templateSource);
    const html = template({
      name: user.name,
      link: `${env('APP_DOMAIN')}/auth/send-change-email?token=${resetToken}`,
    });

    await sendEmail({
      to: user.email,
      subject: 'Change your email',
      html,
    });
  }

  const updatedUser = await updateUserById(_id, {
    ...dataToUpdate,
    name,
    gender,
  });

  res.status(200).json({
    status: 200,
    message: 'User`s ifno has been updated successfully',
    data: updatedUser,
  });
};
