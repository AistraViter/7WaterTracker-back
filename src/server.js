import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import * as contactServices from "./services/contacts.js";

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
  app.get('/contacts', async (req, res) => {
    const contacts = await contactServices.getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactServices.getContactById(contactId);   
    
    // Відповідь, якщо контакт не знайдено
	if (!contact) {
	  res.status(404).json({
		  message: 'Contact not found'
	  });
	  return;
	}

	// Відповідь, якщо контакт знайдено
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });


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
    const port = server.address().port; // Отримуємо призначений порт
    console.log(`Server is running on port ${port}`);
  });
};

//   app.use((req, res, next) => {
//     console.log(`Time: ${new Date().toLocaleString()}`);
//     next();
//   });

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello world!',
//   });
// });
