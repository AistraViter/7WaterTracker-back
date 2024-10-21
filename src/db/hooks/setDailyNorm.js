
import { UsersCollection } from '../models/user.js';

export const setDailyNorm = async function (next) {
    if (!this.dailyNorm) {
      try {
        const user = await UsersCollection.findById(this.userId);
        if (user) {
          this.dailyNorm = user.dailyNorm || 1500;
        }
      } catch (error) {
        return next(error);
      }
    }
    next();
  };
  