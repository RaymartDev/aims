import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? ['http://localhost:3000', 'http://frontend:3000'] : ['*'], // Allow all origins in development, restrict in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all basic request methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies to be sent if needed
};

app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
