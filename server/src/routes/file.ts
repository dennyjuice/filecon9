import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { fileController } from '../controllers';

const fileRouter = Router();

fileRouter.post('', authMiddleware, fileController.createDir);
fileRouter.get('', authMiddleware, fileController.getFiles);

export default fileRouter;
