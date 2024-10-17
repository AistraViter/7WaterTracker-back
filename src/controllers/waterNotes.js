import { getWaterNotes, postWaterNotes, deleteWaterNotes, updateWaterNoteById} from "../services/waterNotes.js";
import createHttpError from "http-errors";

const parseAndAdjustTime = (timeString) => {

    if (typeof timeString !== 'string') {
        throw createHttpError(400, 'Вкажіть коректний формат рядка (string)');
    }

    let parsedTime = timeString.match(/^(\d{1,2}):(\d{2})$/);

    if (!parsedTime) {
        throw createHttpError(400, 'Вкажіть коректний формат часу (HH:mm).');
    }

    // eslint-disable-next-line no-unused-vars
    const [_, hours, minutes] = parsedTime;

    let currentDate = new Date();
    currentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    currentDate.setHours(currentDate.getHours() + 3);

    if (isNaN(currentDate.getTime())) {
        throw createHttpError(400, 'Некоректний час споживання води.');
    }

    return currentDate;
};


export const getWaterNotesController = async (req, res) => {
    const waterUser = await getWaterNotes();

    res.status(200).json({
        message: 'Successfully found all your water notes!',
        data: waterUser,
      });
};

export const createWaterNotesController = async (req, res) => {
    const { waterVolume, date } = req.body;

    if (!waterVolume || typeof waterVolume !== 'number' || waterVolume <= 0) {
        throw createHttpError(400, 'Вкажіть коректну кількість води.');
    }

    if (waterVolume > 5000) {
        throw createHttpError(400, `Максимальна кількість води становить 5000 мл.`);
    }

    if (!date) {
        throw createHttpError(400, 'Вкажіть час споживання води.');
    }

    const currentDate = parseAndAdjustTime(date);

    const newWater = await postWaterNotes({ waterVolume, date: currentDate });

    res.status(201).json({
        message: 'Successfully created a water note!',
        data: newWater,
    });
};

export const patchWaterNotesController = async (req, res, next) => {
    const { waterId } = req.params;
    const { waterVolume, date } = req.body;

    if (!waterId) {
        throw createHttpError(400, 'Ідентифікатор запису є обов’язковим.');
    }

    if (waterVolume !== undefined) {
        if (typeof waterVolume !== 'number' || waterVolume <= 0) {
            throw createHttpError(400, 'Вкажіть коректну кількість води.');
        }

        if (waterVolume > 5000) {
            throw createHttpError(400, `Максимальна кількість води становить 5000 мл.`);
        }
    }

        const updatedDate = parseAndAdjustTime(date);

        const updatedWaterNote = await updateWaterNoteById(waterId, {
            waterVolume,
            date: updatedDate
        });

        if (!updatedWaterNote) {
            throw createHttpError(404, 'Нотатка води не знайдена!');
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully updated a water note!',
            data: updatedWaterNote,
        });
  };

  export const deleteWaterNotesController = async (req, res, next) => {
    const { waterId } = req.params;
    const deleteWaterById = await deleteWaterNotes(waterId);

    if (!deleteWaterById) {
        next(createHttpError(404, 'Нотатка води не знайдена!'));
    }

    res.status(204).send();
};


