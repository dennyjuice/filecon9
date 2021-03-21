import fs from 'fs';
import path from 'path';
import config from 'config';

class FileService {
  createDir(file) {
    const filePath = this.getPath(file);
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        return resolve({ message: 'File was created' });
      } else {
        return reject({ message: 'File already exist' });
      }
    });
  }

  deleteFile(file) {
    const filePath = this.getPath(file);

    if (file.type === 'dir') {
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }

  getPath(file) {
    return path.resolve(config.get('pathFiles'), file.user.toString(), file.path);
  }
}

export default new FileService();
