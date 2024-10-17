import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { waterNotesRouter } from './routers/waterNotes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { authRouter } from './routers/auth.js';
import cookieParser from 'cookie-parser';
import waterMonthRouter from './routers/waterMonth.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(cookieParser());
  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world! Meet our 7WaterTracker!',
    });
  });

  // Всі маршрути писати тут
  app.use(router);
  app.use('/water_notes', waterNotesRouter);
  app.use('/auth', authRouter);
  app.use('/api', waterMonthRouter);


  //

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
  });
};
