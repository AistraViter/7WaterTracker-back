import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './hooks.js';
import { UsersCollection } from './user.js';

// const setTimeToSevenAM = () => {
//     const now = new Date();
//     now.setHours(10, 0, 0, 0); // Встановлюємо час на 7:00:00.000
//     return now;
// };

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    dailyNorm: {
      type: Number,
      ref: 'users'
    },
    waterVolume: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

waterSchema.pre('save', async function (next) {
  if (!this.dailyNorm) {
    try {
      // Знайти користувача за userId
      const user = await UsersCollection.findById(this.userId);

      // Перевірити, чи існує користувач і отримати його dailyNorm
      if (user) {
        this.dailyNorm = user.dailyNorm || 1500; // Якщо користувач має dailyNorm, використовуємо його
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

waterSchema.post('save', handleSaveError);
waterSchema.pre('findOneAndUpdate', setUpdateOptions);

export const WaterCollection = model('water', waterSchema);
