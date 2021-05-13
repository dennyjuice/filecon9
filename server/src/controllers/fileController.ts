import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import config from 'config';
import { UploadedFile } from 'express-fileupload';
import fileService from '../services';
import { User, File } from '../models';
import { IFileRequest, IUserRequest } from '../types';

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

  async uploadFile(req: IFileRequest, res: Response) {
    try {
      const file = req.files.file as UploadedFile;

      const parent = await File.findOne({ user: req.user.id, _id: req.body.parent });
      const user = await User.findOne({ _id: req.user.id });

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: 'There no space on disk' });
      }

      user.usedSpace = user.usedSpace + file.size;

      const pathFile = parent
        ? path.resolve(config.get('pathFiles'), user._id.toString(), parent.path, file.name)
        : path.resolve(config.get('pathFiles'), user._id.toString(), file.name);

      if (fs.existsSync(pathFile)) {
        return res.status(400).json({ message: 'File already exist' });
      }

      await file.mv(pathFile);

      const type = file.name.split('.').pop();
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent ? path.resolve(parent.path, file.name) : file.name,
        parent: parent?._id,
        user: user._id,
      });

      await dbFile.save();
      await user.save();

      return res.json(dbFile);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Upload file Error' });
    }
  }

  async downloadFile(req: IFileRequest, res: Response) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      const filePath = path.resolve(config.get('pathFiles'), req.user.id, file.path, file.name);

      if (fs.existsSync(filePath)) {
        return res.download(filePath, file.name);
      }

      return res.status(400).json({ message: 'Download Error' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Download Error' });
    }
  }

  async deleteFile(req: IFileRequest, res: Response) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });

      if (!file) {
        return res.status(400).json({ message: 'File not found' });
      }

      fileService.deleteFile(file);

      await file.remove();
      return res.json({ message: 'File was deleted' });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Dir is not empty' });
    }
  }

  async searchFile(req: IUserRequest, res: Response) {
    try {
      const searchName = req.query.search;
      let files = await File.find({ user: req.user.id });
      files = files.filter((file) => file.name.toLowerCase().includes(searchName));
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Search error' });
    }
  }
}

export default new FileController();
