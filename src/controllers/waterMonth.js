import createHttpError from 'http-errors'; // Імпорт бібліотеки для створення HTTP помилок
import { addWater, getWaterForMonth } from '../services/waterMonth.js';// Імпорт моделі WaterCollection
import { updateWaterService } from '../services/waterMonth.js';

export const updateWaterController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { volume, date } = req.body;

  const data = await updateWaterService({ _id: id, userId }, { volume, date });

  if (!data) {
    throw createHttpError(404, 'Water record not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully update water record',
    data,
  });
};

export const addWaterController = async (req, res) => {
  const { _id: userId } = req.user;
  const { date, volume, dailyNorma } = req.body;
  const data = await addWater(userId, date, volume, dailyNorma);

  res.status(201).json({
    status: 201,
    message: 'Successfully added water!',
    data,
  });
};
export async function getWaterForMonthController(req, res) {
  try {
    const { month } = req.query; // or req.body if you switch to POST
    
    // Validate the month parameter
    if (!month) {
      return res.status(400).json({
        status: 400,
        message: 'Month is required',
      });
    }

    const userId = req.user._id; // Ensure user is authenticated
    const year = new Date().getFullYear();

    const data = await getWaterForMonth({ month, userId, year });

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'No data found for the specified month',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved data',
      data,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}
