import createHttpError from "http-errors";

export const validateWaterVolume = (waterVolume) => {
    if (waterVolume === undefined || typeof waterVolume !== 'number' || waterVolume <= 0) {
        throw createHttpError(400, 'Enter the correct amount of water format (number).');
    }
    if (waterVolume > 5000) {
        throw createHttpError(400, 'The maximum amount of water is 5000 ml.');
    }
  };
