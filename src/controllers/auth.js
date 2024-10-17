import { registrationUser, sendResetUser, resetPassword } from '../services/auth.js';
import {
  accessTokenValidUntil,
  JWT_EXPIRES_IN,
  refreshTokenValidUntil,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRES_IN } from '../constants/index.js';
import { User } from '../db/models/user.js';
import Session from '../db/models/session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createSession(user) {
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  const accessTokenValidUntilValue = accessTokenValidUntil;
  const refreshTokenValidUntilValue = refreshTokenValidUntil;

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntilValue,
    refreshTokenValidUntilValue,
  };
};

export function setRefreshTokenCookie(res, refreshToken) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const registrationUserController = async (req, res, next) => {
  try {
    const { name, email, password, gender, photo } = req.body;
    const newUser = await registrationUser({
      name,
      email,
      password,
      gender,
      photo,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        photo: newUser.photo,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Контроллер для логина пользователя
export async function loginUserController(req, res, next) {
  try {
    const { email, password } = req.body;

    // Проверяем, переданы ли email и пароль
    if (!email || !password) {
      throw createHttpError(400, 'Email and password required'); // Ошибка 400, если данные неполные
    }

    // Ищем пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Incorrect email or password'); // Ошибка 401, если пользователь не найден
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, 'Incorrect email or password'); // Ошибка 401, если пароль неверный
    }

    // Создаем access и refresh токены с использованием JWT
    const { accessToken, refreshToken } = await createSession(user);

    // Устанавливаем refresh токен в cookies (например, на 30 дней)
    setRefreshTokenCookie(res, refreshToken);

    // Создаем новую сессию и сохраняем её в базе данных
    await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil,
      refreshTokenValidUntil,
    });

    // Возвращаем успешный ответ с access токеном
    res.status(200).json({
      status: 200,
      message: 'Successfully logged in',
      data: {accessToken}
    });
  } catch (error) {
    next(error); // Передаем ошибку в следующий middleware для обработки
  }
}

// Контроллер для выхода пользователя (logout)
export async function logoutUserController(req, res, next) {
  try {
    const { refreshToken } = req.cookies; // Получаем refresh токен из cookies

    // Проверяем, передан ли refresh токен
    if (!refreshToken) {
      throw createHttpError(401, 'Refresh token required'); // Ошибка 401, если токен отсутствует
    }

    // Видаляємо сесію з бази даних
    const session = await Session.findOneAndDelete({ refreshToken });

    if (!session) {
      throw createHttpError(404, 'Session not found');
    }
    // Очищаем cookies с refresh токеном
    res.clearCookie('refreshToken');

    // Возвращаем успешный ответ без тела
    res.status(204).send();
  } catch (error) {
    next(error); // Передаем ошибку в следующий middleware для обработки
  }
}

// Секреты и настройки для токенов (их следует хранить в переменных окружения)


// //Контроллер для создания нового пользователя (регистрация)
// export async function createUserController(req, res, next) {
//   try {
//     const { name, email, password } = req.body;

//     // Проверяем, существует ли пользователь с таким email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       throw createHttpError(409, 'Email in use'); // Ошибка 409, если email уже используется
//     }

//     // Хешируем пароль перед сохранением
//     const hashedPassword = await bcrypt.hash(password, 10); // Хеширование пароля

//     // Создаем нового пользователя
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Возвращаем успешный ответ с информацией о пользователе (без пароля)
//     res.status(201).json({
//       status: 201,
//       message: 'User successfully registered!',
//       data: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     next(error); // Передаем ошибку в middleware для обработки
//   }
// }

export const sendResetEmailController = async (req, res) => {
  await sendResetUser(req.body.email);

  res.status(200).json({
    status: 200,
    message: "Reset password email has been successfully sent.",
    data: {}
});
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).json({
    status: 200,
    message: "Password has been successfully reset.",
    data: {}
});
};


