import { registrationUser } from '../services/auth.js';

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
