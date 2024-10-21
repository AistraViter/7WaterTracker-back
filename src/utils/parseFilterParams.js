// Функція для парсингу contactType
const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return undefined;  // Повертаємо undefined, якщо не рядок
    
    const validContactTypes = ['work', 'home', 'personal'];
    const isValidContactType = validContactTypes.includes(contactType);
    
    if (isValidContactType) return contactType;
    
    return undefined; // Якщо contactType не є дійсним значенням
  };
  
  // Функція для парсингу булевого значення isFavourite
  const parseBoolean = (isFavourite) => {
    if (typeof isFavourite === 'boolean') {
      return isFavourite; // Якщо вже булевий, повертаємо як є
    }
  
    if (typeof isFavourite === 'string') {
      // Перевіряємо, чи значення у вигляді рядка може бути інтерпретовано як булеве
      if (isFavourite.toLowerCase() === 'true') return true;
      if (isFavourite.toLowerCase() === 'false') return false;
    }
  
    return undefined; // Якщо не булеве значення, повертаємо undefined
  };
  
  // Функція для парсингу всіх параметрів фільтрації
  export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;
  
    const parsedContactType = parseContactType(contactType);
    const parsedIsFavourite = parseBoolean(isFavourite);
  
    return {
      contactType: parsedContactType,
      isFavourite: parsedIsFavourite,
    };
  };
  