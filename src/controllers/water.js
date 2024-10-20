import createHttpError from 'http-errors'; 
import {
  getWater,
  getWaterById,
  postWater,
  deleteWater,
  updateWaterById,
  getWaterForMonth,
} from '../services/water.js';
import {
  combineDateAndTime,
} from '../db/hooks/validateDateAndTime.js';

export const getWaterController = async (req, res) => {
  const { _id: userId } = req.user;
  const waterUser = await getWater({ userId });

  res.status(200).json({
    message: 'Successfully found all your water notes!',
    data: waterUser,
  });
};

//Додавання запису по спожитій воді
export const postWaterController = async (req, res) => {
  const { date, waterVolume, time } = req.body;
 
  if (!date || !time)
    throw createHttpError(400, 'Both date and time are required.');

  const newWater = await postWater(
    req.user._id,
    combineDateAndTime(date, time),
    waterVolume,
  );
  res
    .status(201)
    .json({
      status: 201,
      message: 'Successfully added water!',
      data: newWater,
    });
};

//Редагування запису по спожитій воді
export const updateWaterController = async (req, res) => {
  const { waterVolume, date, time } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  // Отримуємо поточний запис про воду
  const currentWaterRecord = await getWaterById(id, userId);

  // Якщо запис не знайдено, кидаємо помилку
  if (!currentWaterRecord) {
    throw createHttpError(404, 'Water record not found');
  }


  // Використовуємо старі значення дати та часу, якщо нові не були передані
  const updatedDate = date || currentWaterRecord.date;
  const updatedTime = time || currentWaterRecord.time;

  // Об'єднання дати і часу, якщо є нові дані
  const updateFields = {};
  if (date || time) {
    updateFields.date = combineDateAndTime(updatedDate, updatedTime);
  }

  // Оновлення запису про воду
  const updatedWater = await updateWaterById(id, userId, {
    ...updateFields,
    ...(waterVolume !== undefined && { waterVolume }),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully updated water record',
    data: updatedWater,
  });
};


//Видалення запису по спожитій воді
export const deleteWaterController = async (req, res) => {
  const result = await deleteWater({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!result) throw createHttpError(404, 'Water not found');
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
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data,
  });
}
