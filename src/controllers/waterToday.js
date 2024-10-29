import { getUserById } from '../services/users.js';
import { getWaterForToday } from '../services/water.js';

export const getWaterTodayController = async (req, res, next) => {
  // 1. get current user from auth
  // 2. get user from the DB
  // 3. get users water notes
  // 4. calculate percentage and return data back.
  const { _id: userId } = req.user;
  const user = await getUserById(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const notes = await getWaterForToday(userId, today, nextDay);
  const consumed = notes.reduce(
    (partialSum, n) => partialSum + n.waterVolume,
    0,
  );
  const percentage =
    consumed > 0 ? Math.round((consumed / user.dailyNorm) * 100) : 0;

  res.status(200).json({
    notes,
    percentage,
  });
};
