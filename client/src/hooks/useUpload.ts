import { DragEventHandler, useMemo, useRef, useState } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { uploadFiles } from '../redux/slices/fileSlice';

type ProgressProps = 'normal' | 'success' | 'exception' | 'active';

interface DropHandlers {
  onDragEnter: DragEventHandler;
  onDragLeave: DragEventHandler;
}

const useUpload = () => {
  const { currentDir } = useAppSelector((state) => state.files);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ProgressProps>('normal');
  const [isOverDrop, setIsOverDrop] = useState(false);
  const dispatch = useAppDispatch();

  const counter = useRef(0);

  const dropHandlers: DropHandlers = useMemo(
    () => ({
      onDragEnter(event) {
        event.preventDefault();
        // eslint-disable-next-line no-plusplus
        counter.current++;
        setIsOverDrop(true);
      },
      onDragLeave(event) {
        event.preventDefault();
        // eslint-disable-next-line no-plusplus
        counter.current--;
        if (counter.current === 0) {
          setIsOverDrop(false);
        }
      },
    }),
    [],
  );

  const uploadFileHandler = (options: any) => {
    const { file, onSuccess, onError } = options;
    setIsOverDrop(false);
    counter.current = 0;

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

  return { uploadOptions, progress, status, isOverDrop, dropHandlers };
};

export default useUpload;
