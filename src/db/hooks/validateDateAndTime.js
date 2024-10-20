import createHttpError from "http-errors";

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
  export const combineDateAndTime = (dateString, timeString) => {
    const validDate = validateDate(dateString);
    const validTime = validateTime(timeString);


    const combinedDateTime = new Date(`${validDate}T${validTime}:00`);

    if (isNaN(combinedDateTime.getTime())) {
      throw createHttpError(400, 'Invalid date or time.');
    }

    combinedDateTime.setHours(combinedDateTime.getHours() + 3);

    return combinedDateTime;
  };
