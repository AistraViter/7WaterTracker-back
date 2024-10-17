import { waterNotesCollection } from '../db/models/waterNotes.js';
import { User } from '../db/models/user.js';
import moment from 'moment-timezone'; 
import createHttpError from 'http-errors';

export const getMonthlyWaterConsumption = async (req, res, next) => {
  const { userId } = req; 
  const { year, month } = req.params;

  try {
    const start = moment.utc().year(year).month(month - 1).startOf('month').toDate();
    const end = moment.utc().year(year).month(month - 1).endOf('month').toDate();

    const [monthlyWaterNotes, user] = await Promise.all([
      waterNotesCollection.find({ userId, date: { $gte: start, $lte: end } }).lean(),
      User.findById(userId).lean(),
    ]);

    if (!monthlyWaterNotes.length || !user) {
      throw createHttpError(404, 'Water notes or user not found');
    }

    const waterConsumption = {};

    monthlyWaterNotes.forEach(record => {
      const date = moment(record.date).date();
      const monthName = moment(record.date).format('MMMM');

      if (!waterConsumption[date]) {
        waterConsumption[date] = {
          date: `${date}, ${monthName}`,
          waterRate: user.waterRate, 
          totalWater: 0,
          amountOfRecords: 0,
        };
      }

      waterConsumption[date].totalWater += record.waterVolume;
      waterConsumption[date].amountOfRecords += 1;
    });

    const result = Object.values(waterConsumption).map(dayData => {
      const percentOfWaterRate = user.waterRate ? Math.min(((dayData.totalWater / user.waterRate) * 100).toFixed(2), 100) : 0;

      return {
        date: dayData.date,
        waterRate: `${dayData.waterRate} L`,
        percentOfWaterRate: `${percentOfWaterRate}%`,
        amountOfRecords: dayData.amountOfRecords,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


