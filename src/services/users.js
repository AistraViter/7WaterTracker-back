import { UsersCollection } from '../db/models/users.js';

export const getUserById = async (userId) => {
  const user = await UsersCollection.findOne({ _id: userId });
  return user;
};

export const updateUserDailyNorm = async (userId, newDailyNorm) => {
  const updatedUser = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    { dailyNorm: newDailyNorm },
    { new: true },
  );

  return updatedUser;
};
