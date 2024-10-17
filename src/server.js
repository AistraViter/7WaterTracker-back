import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
<<<<<<< Updated upstream
import { waterNotesRouter } from './routers/waterNotes.js';
=======
>>>>>>> Stashed changes
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
<<<<<<< HEAD
<<<<<<< HEAD
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { authRouter } from './routers/auth.js';
<<<<<<< Updated upstream
=======
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
=======
import cookieParser from 'cookie-parser';
import router from './routers/index.js';

>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
=======
import cookieParser from 'cookie-parser';
import router from './routers/index.js';

>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
>>>>>>> Stashed changes

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world! Meet our 7WaterTracker!',
    });
  });

<<<<<<< HEAD
<<<<<<< HEAD
  // Всі маршрути писати тут
  app.use('/water_notes', waterNotesRouter);
  app.use('/auth', authRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  //
=======
>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de
=======
>>>>>>> da5454c3198e4589f1f50af6404371bff77ae8de

  app.use('/', router); // Всі маршрути пишемо у routers/index.js
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
  });
};
