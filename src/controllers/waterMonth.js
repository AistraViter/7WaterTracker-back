import { getWaterForMonth } from '../services/water.js';

export async function getWaterForMonthController(req, res) {
  // Пріоритетно беремо параметри з req.query, але якщо їх немає, використовуємо req.body
  const month = req.query.month || req.body.month;
  const year = req.query.year || req.body.year;

  if (!month || !year) {
    return res.status(400).json({
      status: 400,
      message: 'Month and year are required',
    });
  }

  const { _id: userId } = req.user; // userId з req.user

  const data = await getWaterForMonth({
    month: parseInt(month, 10), // переконайся, що це число
    year: parseInt(year, 10),
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data,
  });
}
