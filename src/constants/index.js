<<<<<<< Updated upstream
<<<<<<< HEAD
<<<<<<< HEAD
export const UPLOAD_DIR = path.resolve("uploads");

export const SWAGGER_PATH = path.join(process.cwd(), "docs", "swagger.json");
=======
=======
>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
=======
import path from 'node:path';

>>>>>>> Stashed changes
export const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';
export const JWT_EXPIRES_IN = '15m';
export const REFRESH_TOKEN_EXPIRES_IN = '30d';

<<<<<<< Updated upstream
<<<<<<< HEAD
>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
=======
>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
=======
export const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); // Токен на 15 минут
export const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Токен на 30 дней

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
>>>>>>> Stashed changes
