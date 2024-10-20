import createHttpError from "http-errors";


  // Об'єднання дати та часу в один об'єкт Date
  export const combineDateAndTime = (dateString, timeString) => {

    const combinedDateTime = new Date(`${dateString}T${timeString}:00`);

    if (isNaN(combinedDateTime.getTime())) {
      throw createHttpError(400, 'Invalid date or time.');
    }

    combinedDateTime.setHours(combinedDateTime.getHours() + 3);

    return combinedDateTime;
  };
