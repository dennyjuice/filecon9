import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
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

      const hashPassword = await bcrypt.hash(password, 15);
      const user = new User({ email, password: hashPassword });
      await user.save();

      return response.json({ message: 'User was created' });
    } catch (e) {
      console.log(e);
      response.send({ message: 'Server error' });
    }
  },
);

export default authRouter;
