import path from 'path';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import handlebars from 'handlebars';
import {
  getUserById,
  updateUserById,
  updateUserDailyNorm,
} from '../services/users.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { TEMPLATES_DIR } from '../constants/index.js';
import { env } from '../utils/env.js';
import { createJwtToken } from '../utils/jwt.js';
import { sendEmail } from '../utils/sendEmail.js';

//////////////////////////////// updateDailyNorm ////////////////////////////////
export const updateDailyNormController = async (req, res, next) => {
  // userId comes from the req.user._id parameter, which is provided by the authenticate.js middleware
  const userId = req.user._id;
  const { weight, activeTime, dailyNorm } = req.body;

  let newDailyNorm;

  const user = await getUserById(userId);
  if (!user) {
    return next(createHttpError(404, 'User is not found'));
  }

  // check weight and activeTime are not empty
  const M = weight !== undefined ? weight : user.weight;
  const T = activeTime !== undefined ? activeTime : user.activeTime;

  // calculate dailyNorm for genders
  if (user.gender === 'Woman') {
    newDailyNorm = Number((M * 0.03 + T * 0.4).toFixed(2));
  } else if (user.gender === 'Man') {
    newDailyNorm = Number((M * 0.04 + T * 0.6).toFixed(2));
  }

  // user enters custom dailyNorm
  if (dailyNorm) {
    newDailyNorm = dailyNorm;
  }

  // restricted dailyNorm
  if (dailyNorm > 15000) {
    newDailyNorm = 15000; // по тз максимум 15000мл
  }

  try {
    const updatedUser = await updateUserDailyNorm(userId, newDailyNorm);
    res.json({
      message: 'Daily water norm updated successfully',
      dailyNorm: updatedUser.dailyNorm,
    });
  } catch (error) {
    createHttpError(500, error);
  }
};

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
