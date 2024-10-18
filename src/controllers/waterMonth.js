<<<<<<< Updated upstream
<<<<<<< HEAD
import createHttpError from 'http-errors';
import { waterNotesCollection } from '../db/models/waterNotes.js'; 
import { User } from '../db/models/user.js'; 

export const getMonthlyWaterConsumptionController = async (req, res, next) => {
    const { userId } = req.params; // Зберігаємо userId з параметрів
=======
import createHttpError from 'http-errors';
import { waterNotesCollection } from '../db/models/waterNotes.js'; 
import { UsersCollection } from '../db/models/user.js'; 

export const getWaterMonthController = async (req, res, next) => {
    const { _id:userId } = req.user; // Зберігаємо userId з параметрів
>>>>>>> Stashed changes
    const { year, month } = req.query; // Зберігаємо year та month з запиту

    try {
        // Отримуємо денну норму для користувача
<<<<<<< Updated upstream
        const user = await User.findById(userId).select('dailyNorm');
=======
        const user = await UsersCollection.findById(userId).select('dailyNorm');
>>>>>>> Stashed changes
        
        if (!user) {
            return next(createHttpError(404, 'User not found'));
        }

        const dailyNorm = user.dailyNorm || 0; // Отримуємо значення денної норми

        // Отримуємо дані споживання води за вказаний місяць
        const consumptions = await waterNotesCollection.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: new Date(`${year}-${month}-01`), // Перший день місяця
                        $lt: new Date(`${year}-${month}-01T23:59:59Z`), // Останній день місяця
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$date' },
                    },
                    totalConsumption: { $sum: '$amount' }, // Загальна кількість споживання
                    count: { $sum: 1 }, // Кількість записів
                },
            },
        ]);

        // Форматування відповіді
        const response = [];
        const daysInMonth = new Date(year, month, 0).getDate(); // Отримуємо кількість днів у місяці

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month - 1, day);
            const dateString = currentDate.toISOString().split('T')[0]; // Формат дати YYYY-MM-DD
            const consumptionData = consumptions.find(entry => entry._id === dateString) || { totalConsumption: 0, count: 0 };

            const totalConsumption = consumptionData.totalConsumption; // Споживання для цього дня
            const count = consumptionData.count; // Кількість записів для цього дня
            const percentage = dailyNorm ? ((totalConsumption / dailyNorm) * 100).toFixed(2) : 0; // Відсоток споживання

            response.push({
                date: `${day}, ${currentDate.toLocaleString('default', { month: 'long' })}`,
                dailyNorm: `${dailyNorm} L`,
                percentage: `${totalConsumption > 0 ? percentage : 0}%`,
                consumptionCount: count,
            });
        }

        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        console.error('Error retrieving monthly water consumption:', error.message);
        next(createHttpError(500, 'Internal Server Error'));
    }
};





<<<<<<< Updated upstream
=======
import createHttpError from 'http-errors';
import { waterNotesCollection } from '../db/models/waterNotes.js'; 
import { User } from '../db/models/user.js'; 

export const getMonthlyWaterConsumptionController = async (req, res, next) => {
    const { userId } = req.params; // Зберігаємо userId з параметрів
    const { year, month } = req.query; // Зберігаємо year та month з запиту

    try {
        // Отримуємо денну норму для користувача
        const user = await User.findById(userId).select('dailyNorm');
        
        if (!user) {
            return next(createHttpError(404, 'User not found'));
        }

        const dailyNorm = user.dailyNorm || 0; // Отримуємо значення денної норми

        // Отримуємо дані споживання води за вказаний місяць
        const consumptions = await waterNotesCollection.aggregate([
            {
                $match: {
                    userId: userId,
                    date: {
                        $gte: new Date(`${year}-${month}-01`), // Перший день місяця
                        $lt: new Date(`${year}-${month}-01T23:59:59Z`), // Останній день місяця
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$date' },
                    },
                    totalConsumption: { $sum: '$amount' }, // Загальна кількість споживання
                    count: { $sum: 1 }, // Кількість записів
                },
            },
        ]);

        // Форматування відповіді
        const response = [];
        const daysInMonth = new Date(year, month, 0).getDate(); // Отримуємо кількість днів у місяці

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month - 1, day);
            const dateString = currentDate.toISOString().split('T')[0]; // Формат дати YYYY-MM-DD
            const consumptionData = consumptions.find(entry => entry._id === dateString) || { totalConsumption: 0, count: 0 };

            const totalConsumption = consumptionData.totalConsumption; // Споживання для цього дня
            const count = consumptionData.count; // Кількість записів для цього дня
            const percentage = dailyNorm ? ((totalConsumption / dailyNorm) * 100).toFixed(2) : 0; // Відсоток споживання

            response.push({
                date: `${day}, ${currentDate.toLocaleString('default', { month: 'long' })}`,
                dailyNorm: `${dailyNorm} L`,
                percentage: `${totalConsumption > 0 ? percentage : 0}%`,
                consumptionCount: count,
            });
        }

        res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        console.error('Error retrieving monthly water consumption:', error.message);
        next(createHttpError(500, 'Internal Server Error'));
    }
};





>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
=======
>>>>>>> Stashed changes
