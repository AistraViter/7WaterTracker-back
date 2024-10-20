import { UsersCollection } from '../db/models/user.js';

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

  console.log('Updated User:', updatedUser);

  return updatedUser;
};

export const updateUserById = async (userId, update) => {
  const result = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    update,
    {
      new: true,
    },
  );

  return result;
};
