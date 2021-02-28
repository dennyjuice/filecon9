import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import authMiddleware from '../middleware/auth.middleware';
import config from 'config';
import User from '../models';
import { Routes } from '../helpers/constants';
import { IUserRequest } from '../types';

const authRouter = Router();

authRouter.post(
  Routes.REGISTER_USER,
  [
    check('username', 'Username should be longer than 3 characters').isLength({ min: 3 }),
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password should be longer than 3 and shorter than 12 characters').isLength({ min: 3, max: 12 }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ error: 'Incorrect request', errors });
      }

      const { username, email, password } = request.body;
      const candidate = await User.findOne({ $or: [{ email }, { username }] });

      if (candidate) {
        return response
          .status(400)
          .json({ error: `User with email '${email}' or username '${username}' already exist!` });
      }

      const hashPassword = await bcrypt.hash(password, 7);
      const user = new User({ username, email, password: hashPassword });
      await user.save();

      return response.json({ message: 'User was created' });
    } catch (e) {
      response.send({ error: 'Server error' });
    }
  },
);

authRouter.post(Routes.LOGIN_USER, async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return response.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
    return response.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    response.send({ error: 'Server error' });
  }
});

authRouter.get(Routes.GET_CURRENT_USER, authMiddleware, async (request: IUserRequest, response) => {
  try {
    const user = await User.findOne({ _id: request.user.id });
    const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

    return response.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    response.send({ error: 'Server error' });
  }
});

export default authRouter;
