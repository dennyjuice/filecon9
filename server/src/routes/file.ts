import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { fileController } from '../controllers';
import { Routes } from '../helpers/constants';

const fileRouter = Router();

fileRouter.post('', authMiddleware, fileController.createDir);
fileRouter.post(Routes.FILE_UPLOAD, authMiddleware, fileController.uploadFile);
fileRouter.get('', authMiddleware, fileController.getFiles);
fileRouter.get(Routes.FILE_DOWNLOAD, authMiddleware, fileController.downloadFile);

export default fileRouter;
