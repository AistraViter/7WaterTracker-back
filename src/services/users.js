import {  User  } from '../db/models/user.js';

export const getUserById = async (userId) => {
  const user = await User.findOne({ _id: userId });
  return user;
};

export const updateUserDailyNorm = async (userId, newDailyNorm) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { dailyNorm: newDailyNorm },
    { new: true },
  );

  return updatedUser;
};
