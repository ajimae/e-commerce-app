import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import Database from '../src/db';
import { config } from '../src/db/config';

import routes from './routes';

const app = express();
const { NODE_ENV } = process.env;
const database = new Database(mongoose, config[NODE_ENV].DATABASE_URL);

// Application-Level Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect database
database.connect();

// Global error handler
app.use((err, req, res, next) => {
  // response to user with 403 error and details
  if (error) {
    next(error);
  } else {
    next();
  }
});

// Routes
app.use('/api/v1', routes);
app.use('*', async (req, res) => {
  return res.status(404).json({
    status: 'error',
    data: {
      message: 'resource not found on this server'
    }
  });
});

export default app;
