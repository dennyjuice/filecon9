import { DragEventHandler, useMemo, useRef, useState } from 'react';
import { uploadFiles } from '../fileSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

interface DropHandlers {
  onDragEnter: DragEventHandler;
  onDragLeave: DragEventHandler;
  onDrop: any;
}

const useDragDropUpload = () => {
  const [isOverDrop, setIsOverDrop] = useState(false);
  const { currentDir } = useAppSelector((state) => state.files);
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
      onDrop() {
        setIsOverDrop(false);
        counter.current = 0;
        return (options: any) => {
          const { file, onSuccess, onError } = options;

          const config = {
            headers: { 'content-type': 'multipart/form-data' },
          };

          dispatch(uploadFiles({ file, parent: currentDir, config }))
            .then(() => {
              onSuccess(file);
            })
            .catch((res) => {
              onError(res);
            });
        };
      },
    }),
    [currentDir, dispatch],
  );

  return { isOverDrop, dropHandlers };
};

export default useDragDropUpload;
