import fs from 'fs';
import path from 'path';
import config from 'config';

class FileService {
  createDir(file) {
    const filePath = path.resolve(config.get('pathFiles'), file.user.toString(), file.path);
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        return resolve({ message: 'File was created' });
      } else {
        return reject({ message: 'File already exist' });
      }
    });
  }
}

export default new FileService();
