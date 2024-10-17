import { getWaterNotes, postWaterNotes, deleteWaterNotes, updateWaterNoteById} from "../services/waterNotes.js";
import createHttpError from "http-errors";

const parseAndAdjustTime = (timeString) => {

    if (typeof timeString !== 'string') {
        throw createHttpError(400, 'Specify the correct time format (string)');
    }

    let parsedTime = timeString.match(/^(\d{1,2}):(\d{2})$/);

    if (!parsedTime) {
        throw createHttpError(400, 'Enter the correct time format (HH:mm).');
    }

    // eslint-disable-next-line no-unused-vars
    const [_, hours, minutes] = parsedTime;

    let currentDate = new Date();
    currentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    currentDate.setHours(currentDate.getHours() + 3);

    if (isNaN(currentDate.getTime())) {
        throw createHttpError(400, 'Incorrect time');
    }

    return currentDate;
};

const validateWaterVolume = (waterVolume) => {
    if (waterVolume === undefined || typeof waterVolume !== 'number' || waterVolume <= 0) {
        throw createHttpError(400, 'Enter the correct amount of water format (number).');
    }
    if (waterVolume > 5000) {
        throw createHttpError(400, 'The maximum amount of water is 5000 ml.');
    }
};


export const getWaterNotesController = async (req, res) => {
    const {_id: userId} = req.user;
    const waterUser = await getWaterNotes({userId});

    res.status(200).json({
        message: 'Successfully found all your water notes!',
        data: waterUser,
      });
};

export const createWaterNotesController = async (req, res) => {
    const { waterVolume, date } = req.body;
    const userId = req.user;

    validateWaterVolume(waterVolume);

    if (!date) {
        throw createHttpError(400, 'Specify the time of water consumption');
    }

    const currentDate = parseAndAdjustTime(date);

    const newWater = await postWaterNotes({ waterVolume, date: currentDate, userId });

    res.status(201).json({
        message: 'Successfully created a water note!',
        data: newWater,
    });
};

export const patchWaterNotesController = async (req, res, next) => {
    const { waterId } = req.params;
    const { waterVolume, date } = req.body;
    const { _id: userId } = req.user;

    if (!waterId) {
        throw createHttpError(400, 'Record ID is required.');
    }

    if (waterVolume !== undefined) {
        validateWaterVolume(waterVolume);
    }

    const updatedDate = parseAndAdjustTime(date);

    const updatedWaterNote = await updateWaterNoteById(waterId, userId, {waterVolume, date: updatedDate});

    if (!updatedWaterNote) {
        throw createHttpError(404, 'No water note found!');
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully updated a water note!',
        data: updatedWaterNote,
    });
  };

  export const deleteWaterNotesController = async (req, res, next) => {
    const { waterId } = req.params;
    const {_id: userId} = req.user;
    const deleteWaterById = await deleteWaterNotes(waterId, userId);

    if (!deleteWaterById) {
        next(createHttpError(404, 'No water note found!'));
    }

    res.status(204).send();
};


