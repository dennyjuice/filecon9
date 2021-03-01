import { Router } from 'express';
import { check } from 'express-validator';
import authMiddleware from '../middleware/auth.middleware';
import { authController } from '../controllers';
import { Routes } from '../helpers/constants';

const authRouter = Router();

authRouter.post(
  Routes.REGISTER_USER,
  [
    check('username', 'Username should be longer than 3 characters').isLength({ min: 3 }),
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password should be longer than 3 and shorter than 12 characters').isLength({ min: 3, max: 12 }),
  ],
  authController.register,
);

authRouter.post(Routes.LOGIN_USER, authController.login);

authRouter.get(Routes.GET_CURRENT_USER, authMiddleware, authController.getCurrentUser);

export default authRouter;
