import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

import authRouter from '../routes';
import { Routes } from '../helpers/constants';

const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use(Routes.AUTH, authRouter);

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

export default start;
