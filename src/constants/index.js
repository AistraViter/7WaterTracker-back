export const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';
export const JWT_EXPIRES_IN = '15m';
export const REFRESH_TOKEN_EXPIRES_IN = '30d';

export const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); // Токен на 15 минут
export const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Токен на 30 дней
