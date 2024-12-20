import createHttpError from 'http-errors'; // Import for creating HTTP errors
import { WaterCollection } from '../db/models/waterNote.js';

// Функція для отримання всіх записів води
export const getWater = async (userId) => {
  const water = WaterCollection.find(userId);
  return water;
};

// Функція для отримання запису води за ID з урахуванням userId
//Роутера такого немає, просто потрібна для патчу
export const getWaterById = async (id, userId) => {
  const contact = await WaterCollection.findOne({ _id: id, userId });
  return contact;
};

// Функція для додавання нового запису про споживання води
export const postWater = async (userId, date, waterVolume, time) => {
  const waterload = {
    userId,
    date,
    waterVolume,
    time,
  };
  return await WaterCollection.create(waterload);
};

// Функція для оновлення записів споживання води
export const updateWaterById = async (id, userId, options = {}) => {
  const existingWaterNote = await WaterCollection.findOneAndUpdate(
    { _id: id, userId },
    options,
    { new: true },
  );

  if (!existingWaterNote) {
    return null;
  }

  return existingWaterNote;
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
export async function getWaterForMonth({ userId, month, year }) {
  if (!month) {
    throw createHttpError(400, 'Month is required');
  }

  const waterRecords = await WaterCollection.aggregate([
    {
      $match: {
        userId: userId, // Фільтрація за userId
        $expr: {
          $and: [
            { $eq: [{ $month: "$date" }, month] }, // Фільтрація за місяцем
            { $eq: [{ $year: "$date" }, year] }    // Фільтрація за роком
          ]
        }
      }
    }
  ]);

  const dailyRecords = {};

  waterRecords.forEach((record) => {
    // Форматуємо дату
    const date = `${record.date.getDate()}, ${record.date.toLocaleString('en', {
      month: 'long',
    })}`;

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
}
