import path from 'path';

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'CLOUD_API_KEY',
  API_SECRET: 'CLOUD_API_SECRET',
};

export const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';
export const JWT_EXPIRES_IN = '120m';
export const REFRESH_TOKEN_EXPIRES_IN = '30d';

export const accessTokenValidUntil = new Date(Date.now() + 120 * 60 * 1000); // Токен на 15 минут
export const refreshTokenValidUntil = new Date(
  Date.now() + 30 * 24 * 60 * 60 * 1000,
); // Токен на 30 дней

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

//Документація  
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
