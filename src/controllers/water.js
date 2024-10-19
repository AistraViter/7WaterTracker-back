import createHttpError from 'http-errors'; // Імпорт бібліотеки для створення HTTP помилок
import { getWater, postWater, deleteWater, updateWaterById, getWaterForMonth } from '../services/water.js';

const validateWaterVolume = (waterVolume) => {
  if (waterVolume === undefined || typeof waterVolume !== 'number' || waterVolume <= 0) {
      throw createHttpError(400, 'Enter the correct amount of water format (number).');
  }
  if (waterVolume > 5000) {
      throw createHttpError(400, 'The maximum amount of water is 5000 ml.');
  }
};

// Валідація дати (YYYY-MM-DD)
const validateDate = (dateString) => {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!dateRegex.test(dateString)) {
    throw createHttpError(400, 'Enter the correct date format (YYYY-MM-DD).');
  }

  return dateString;
};

// Валідація часу (HH:mm)
const validateTime = (timeString) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(timeString)) {
    throw createHttpError(400, 'Enter the correct time format (HH:mm).');
  }

  return timeString;
};

// Об'єднання дати та часу в один об'єкт Date
const combineDateAndTime = (dateString, timeString) => {
  const validDate = validateDate(dateString);
  const validTime = validateTime(timeString);


  const combinedDateTime = new Date(`${validDate}T${validTime}:00`);

  if (isNaN(combinedDateTime.getTime())) {
    throw createHttpError(400, 'Invalid date or time.');
  }

  return combinedDateTime;
};



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

  // Передаємо id та userId окремо, а також опції
  const data = await updateWaterById(id, userId, { waterVolume, date, time});

  if (!data) {
    throw createHttpError(404, 'Water record not found');
  }

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
