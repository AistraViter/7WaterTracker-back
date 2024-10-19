import createHttpError from 'http-errors'; // Import for creating HTTP errors
import { WaterCollection } from '../db/models/Water.js';


// Функція для отримання всіх записів води
export const getWater = async (userId) => {
  const water = WaterCollection.find(userId);
  return water;
};

// Функція для додавання нового запису про споживання води
export const postWater = async (userId, date, waterVolume, time) => {
  const waterload = {
    userId,
    date,
    waterVolume,
    time
  };
  return await WaterCollection.create(waterload);
};


// Функція для оновлення записів споживання води
export const updateWaterById = async (id, userId, options = {}) => {
  const existingWaterNote = await WaterCollection.findOneAndUpdate(
    { _id: id, userId },
        options,
    { new: true }
  );

  if (!existingWaterNote) {
    return null;
  }

  return existingWaterNote;

  // if (updatedData.waterVolume !== undefined) {
  //   existingWaterNote.waterVolume = updatedData.waterVolume;
  // }

  // if (updatedData.date !== undefined) {
  //   existingWaterNote.date = updatedData.date;
  // }

};

// Функція для видалення запису про споживання води
export const deleteWater = async (filter) => {
  return await WaterCollection.findOneAndDelete(filter);
};



// Функція для дістання дати для дня
export const getWaterForToday = async (userId, startDate, endDate) => {
  return WaterCollection.find({
    userId,
    date: { $gte: startDate, $lt: endDate },
  });
};

// Функція для отримання записів споживання води за певний місяць
export async function getWaterForMonth({ year, userId, month }) {
  if (!month) {
    throw createHttpError(400, 'Month is required');
  }

  // Початок і кінець місяця
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59); // останній день місяця

  // Запит з датами як об'єктами Date
  const waterRecords = await WaterCollection.find({
    userId: userId,
    date: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  });

  const dailyRecords = {};

  waterRecords.forEach((record) => {
    // Форматуємо дату
    const date = `${record.date.getDate()}, ${record.date.toLocaleString('en', { month: 'long' })}`;

    if (!dailyRecords[date]) {
      dailyRecords[date] = {
        totalVolume: 0,
        dailyNorm: record.dailyNorm,
        consumptionCount: 0,
      };
    }
    dailyRecords[date].totalVolume += record.waterVolume;
    dailyRecords[date].consumptionCount += 1;
  });

  const result = Object.keys(dailyRecords).map((date) => {
    const record = dailyRecords[date];
    const percentage = (record.totalVolume / record.dailyNorm) * 100;

    return {
      date: date,
      dailyNorm: (record.dailyNorm / 1000).toFixed(1) + ' L',
      consumptionCount: record.consumptionCount,
      percentage: `${Math.round(percentage)}%`,
    };
  });

  return result;
};
