import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';
import { File, User } from '../models';
import fileService from '../services';
import { IUserRequest } from '../types';
import { Response } from 'express';

class AuthController {
  async register(req: IUserRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Incorrect request', errors });
      }

      const { username, email, password } = req.body;
      const candidate = await User.findOne({ $or: [{ email }, { username }] });

      if (candidate) {
        return res.status(400).json({ error: `User with email '${email}' or username '${username}' already exist!` });
      }

      const hashPassword = await bcrypt.hash(password, 7);
      const user = new User({ username, email, password: hashPassword });
      await user.save();

      await fileService.createDir(new File({ user: user.id, name: '' }));

      return res.json({ message: 'User was created' });
    } catch (e) {
      console.log(e);
      res.send({ error: 'Server error' });
    }
  }

  async login(req: IUserRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPassValid = bcrypt.compareSync(password, user.password);

      if (!isPassValid) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });
      return res.json({
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
      console.log(e);
      res.send({ error: 'Server error' });
    }
  }

  async getCurrentUser(request: IUserRequest, response) {
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
      console.log(e);
      response.send({ error: 'Server error' });
    }
  }
}

export default new AuthController();
