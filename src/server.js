import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


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
  app.get('/health-check', (req, res) => {
    res.status(200).send('OK');
  });
  app.use('/api-docs', swaggerDocs());
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world! Meet our 7WaterTracker!',
    });
  });

  app.use('/', router); // Всі маршрути пишемо у routers/index.js
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
  });
};

