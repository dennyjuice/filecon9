import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

import { authRouter, fileRouter } from './routes';
import { Routes } from './helpers/constants';
import corsMiddleware from './middleware/cors.middleware';

const app = express();
const PORT = config.get('serverPort');

app.use(corsMiddleware);
app.use(express.json());
app.use(Routes.AUTH, authRouter);
app.use(Routes.FILES, fileRouter);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(config.get('dbUrl'), { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

start();
