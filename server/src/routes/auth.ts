import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import config from 'config';
import User from '../models';
import { Routes } from '../helpers/constants';

const authRouter = Router();

authRouter.post(
  Routes.REGISTER_USER,
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password should be longer than 3 and shorter than 12 characters').isLength({ min: 3, max: 12 }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ message: 'Incorrect request', errors });
      }

      const { email, password } = request.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return response.status(400).json({ message: `User with email ${email} already exist!` });
      }

      const hashPassword = await bcrypt.hash(password, 7);
      const user = new User({ email, password: hashPassword });
      await user.save();

      return response.json({ message: 'User was created' });
    } catch (e) {
      console.log(e);
      response.send({ message: 'Server error' });
    }
  },
);

authRouter.post(Routes.LOGIN_USER, async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return response.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
    return response.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    response.send({ message: 'Server error' });
  }
});

export default authRouter;
