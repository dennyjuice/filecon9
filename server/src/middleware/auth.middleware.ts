import { Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { IUserRequest } from '../types';

export default (req: IUserRequest, res: Response, next: () => void) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Auth error no token' });
    }

    const decoded = jwt.verify(JSON.parse(token), config.get('secretKey'));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth error unknown' });
  }
};
