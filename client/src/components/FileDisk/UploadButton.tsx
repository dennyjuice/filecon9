import React, { useState } from 'react';
import { Button, message, Upload, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { uploadFiles } from '../../redux/slices/fileSlice';
import styles from './File.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';

type ProgressProps = 'normal' | 'success' | 'exception' | 'active';

const UploadButton: React.FC<{ currentDir: string }> = ({ currentDir }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ProgressProps>('normal');
  const dispatch = useAppDispatch();

  const uploadFileHandler = (options: any) => {
    const { file, onSuccess, onError } = options;

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setStatus('success');
          setTimeout(() => {
            setProgress(0);
            setStatus('normal');
          }, 1000);
        }
      },
    };

    dispatch(uploadFiles({ file, parent: currentDir, config }))
      .then(() => {
        onSuccess(file);
      })
      .catch((res) => {
        setStatus('exception');
        onError(res);
      });
  };

  const uploadOptions = {
    name: 'file',
    customRequest: uploadFileHandler,
    onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} успешно загружен.`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} - ${info.file.error.message}`);
      }
    },
    showUploadList: false,
    multiple: true,
  };

  return (
    <>
      <Upload {...uploadOptions} className={styles.upload}>
        <Button icon={<UploadOutlined />}>Загрузить файл</Button>
      </Upload>

      {progress !== 0 && <Progress type="circle" percent={progress} width={32} status={status} />}
    </>
  );
};

export default UploadButton;
