import createHttpError from 'http-errors';
import { getUserById, updateUserDailyNorm } from '../services/users.js';

//////////////////////////////// updateDailyNorm ////////////////////////////////
export const updateDailyNormController = async (req, res, next) => {
  const userId = req.params.userId;
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
  if (user.gender === 'woman') {
    newDailyNorm = Number((M * 0.03 + T * 0.4).toFixed(2));
  } else if (user.gender === 'man') {
    newDailyNorm = Number((M * 0.04 + T * 0.6).toFixed(2));
  }

  // user enters custom dailyNorm
  if (dailyNorm) {
    newDailyNorm = dailyNorm;
  }

  // restricted dailyNorm
  if (dailyNorm > 1500) {
    newDailyNorm = 1500;
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
