import React, { useState } from 'react';
import { message, Progress } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { uploadFiles } from '../fileSlice';
import UploadButton from '../../../components/UploadButton';

type ProgressProps = 'normal' | 'success' | 'exception' | 'active';

const ButtonUploader = () => {
  const { currentDir } = useAppSelector((state) => state.files);
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
      <UploadButton uploadOptions={uploadOptions} />
      {progress !== 0 && <Progress type="circle" percent={progress} width={32} status={status} />}
    </>
  );
};

export default ButtonUploader;
