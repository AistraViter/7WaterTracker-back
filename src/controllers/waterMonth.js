import createHttpError from 'http-errors';
import { waterNotesCollection as WaterNote } from '../db/models/waterNotes.js';
import { User } from '../db/models/user.js';
import moment from 'moment-timezone';

export const getMonthlyWaterConsumptionController = async (userId, month) => {
  // Визначення початкової та кінцевої дати для поточного року
  const start = moment.utc().month(month - 1).startOf('month').toDate();
  const end = moment.utc().month(month - 1).endOf('month').toDate();

  // Паралельні запити до бази даних
  const [monthlyWaterNotes, user] = await Promise.all([
    WaterNote.find({ userId, date: { $gte: start, $lte: end } }).lean(),
    User.findById(userId).lean(),
  ]);

  // Перевірка наявності даних
  if (!monthlyWaterNotes.length || !user) {
    throw createHttpError(404, 'Water notes or user not found');
  }

  // Групування записів за датою
  const waterPerDay = monthlyWaterNotes.reduce((acc, record) => {
    const day = moment.utc(record.date).date(); // Отримання числа дня
    if (!acc[day]) {
      acc[day] = { totalWater: 0, count: 0 }; // Ініціалізація, якщо дня ще немає в об'єкті
    }
    acc[day].totalWater += record.waterVolume; // Додавання спожитої води
    acc[day].count += 1; // Збільшення лічильника записів
    return acc;
  }, {});

  // Формування результату
  return Object.keys(waterPerDay).map((day) => {
    const { totalWater, count } = waterPerDay[day];
    const waterRate = user.waterRate || 0; // Добова норма споживання

    const percentOfWaterRate = waterRate > 0 
      ? Math.min(((totalWater / waterRate) * 100).toFixed(0), 100) 
      : 0; // Уникаємо ділення на нуль

    return {
      date: `${day} ${moment(start).format('MMMM')}`, // Форматування дати
      waterRate: `${(waterRate / 1000).toFixed(1)} L`, // Добова норма в літрах
      percentOfWaterRate: `${percentOfWaterRate}%`, // Відсоток від норми
      amountOfRecords: count, // Кількість записів за день
    };
  });
};






