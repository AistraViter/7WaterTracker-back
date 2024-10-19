import mongoose from 'mongoose';

// Схема для моделі Session
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Ссылка на пользователя (User)
      required: [true, 'User ID is required'], // Обязательное поле
      ref: 'users', // Ссылка на коллекцию пользователей
    },
    accessToken: {
      type: String,
      required: [true, 'Access token is required'], // Обязательное поле
    },
    refreshToken: {
      type: String,
      required: [true, 'Refresh token is required'], // Обязательное поле
    },
    accessTokenValidUntil: {
      type: Date,
      required: [true, 'Access token validity date is required'], // Обязательное поле
    },
    refreshTokenValidUntil: {
      type: Date,
      required: [true, 'Refresh token validity date is required'], // Обязательное поле
    },
  },
  {
    timestamps: true,  versionKey: false,// Автоматически добавляет поля createdAt и updatedAt
  },
);

// Создаем модель Session
const SessionsCollection = mongoose.model('sessions', sessionSchema);

export default SessionsCollection;
// Цей файл перевірено 19.10.2024 21.40 by AistraViter
