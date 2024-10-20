import createHttpError from 'http-errors'; // Імпорт бібліотеки для створення HTTP помилок
import { getWater, postWater, deleteWater, updateWaterById, getWaterForMonth } from '../services/water.js';
import { validateWaterVolume } from '../db/hooks/validateWaterVolume.js';
import { combineDateAndTime } from '../db/hooks/validateDateAndTime.js';

export const getWaterController = async (req, res) => {
  const {_id: userId} = req.user;
  const waterUser = await getWater({userId});

  res.status(200).json({
      message: 'Successfully found all your water notes!',
      data: waterUser,
    });
};

//Додавання запису по спожитій воді
export const postWaterController = async (req, res) => {
  const userId = req.user;
  const { date, waterVolume, time } = req.body;

  // Валідація об'єму води
  validateWaterVolume(waterVolume);

  // Перевірка наявності дати й часу
  if (!date || !time) {
    throw createHttpError(400, 'Both date and time are required.');
  }

  // Об'єднання дати й часу
  const combinedDateTime = combineDateAndTime(date, time);

  // Додаємо запис про споживання води
  const newWater = await postWater(userId, combinedDateTime, waterVolume);

  res.status(201).json({
    status: 201,
    message: 'Successfully added water!',
    data: newWater,
  });
};

//Редагування запису по спожитій воді
export const updateWaterController = async (req, res) => {
  const { id } = req.params; // id для запису про воду
  const { _id: userId } = req.user; // id користувача
  const { waterVolume, date, time } = req.body; // дані з тіла запиту

  validateWaterVolume(waterVolume);

  let combinedDateTime;
  if (date && time) {
    combinedDateTime = combineDateAndTime(date, time);
  }

  const data = await updateWaterById(id, userId, { waterVolume, date: combinedDateTime });

  res.status(200).json({
    status: 200,
    message: 'Successfully updated water record',
    data,
  });
};


 //Видалення запису по спожитій воді
 export const deleteWaterController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteWater({
    _id: id,
    userId: userId,
  });

  if (!data) {
    throw createHttpError(404, 'Water not found');
  }

  res.status(204).send();
};

//отримання даних про споживання води за певний місяць
export async function getWaterForMonthController(req, res) {
  const { month, year } = req.query; // отримуємо параметри

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
    userId
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data,
  });
}
