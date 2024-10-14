import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

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

  // Всі маршрути писати тут

  //

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  const server = app.listen(PORT, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
  });
};
