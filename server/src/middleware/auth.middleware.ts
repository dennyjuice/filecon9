import { Response } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { IUserRequest, IUser } from '../types';

export default (req: IUserRequest, res: Response, next: () => void): Response | void => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Auth error no token' });
    }

    const decoded = jwt.verify(token, config.get('secretKey')) as IUser;
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Auth error unknown' });
  }
};
