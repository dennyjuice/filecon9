import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

const app = express();
const PORT = config.get('serverPort');

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
