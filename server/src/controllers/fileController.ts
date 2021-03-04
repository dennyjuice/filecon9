import { Response } from 'express';
import fileService from '../services';
import File from '../models/File';
import { IUserRequest } from '../types';

class FileController {
  async createDir(req: IUserRequest, res: Response) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id, date: Date.now() });
      const parentFile = await File.findOne({ _id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}/${file.name}`;
        await fileService.createDir(file);
        parentFile.children.push(file._id);
        await parentFile.save();
      }

      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req: IUserRequest, res: Response) {
    try {
      const files = await File.find({ user: req.user.id, parent: req.query.parent });
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Get files Error' });
    }
  }
}

export default new FileController();
