import React, { useEffect, useLayoutEffect, useState } from 'react';
import { List, Button, Progress, Upload } from 'antd';
import { LeftOutlined, FileAddOutlined, InboxOutlined } from '@ant-design/icons';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { getFiles, setCurrentDir } from './fileSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useUpload from './hooks/useUpload';
import File from './File';
import UploadButton from '../../components/UploadButton';
import CreateDirModal from './CreateDirModal';
import styles from './styles.module.scss';

interface RouterProps {
  dirId: string;
}

const FileDisk = ({ match }: RouteComponentProps<RouterProps>) => {
  const { files, currentDir, isLoading } = useAppSelector((state) => state.files);
  const { uploadOptions, progress, status, isOverDrop, dropHandlers } = useUpload();

  const dispatch = useAppDispatch();
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch(setCurrentDir(match.params.dirId));
  }, [dispatch, match.params.dirId]);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir, dispatch]);

  const listTitle = (
    <div className={styles.listTitle}>
      <span className={styles.name}>Название</span>
      <span className={styles.date}>Дата</span>
      <span className={styles.size}>Размер</span>
    </div>
  );

  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const backClickHandler = () => {
    history.goBack();
  };

  return (
    <div {...dropHandlers} className={styles.filesContainer}>
      <div className={styles.navButtons}>
        {currentDir && (
          <Button icon={<LeftOutlined />} onClick={backClickHandler}>
            Назад
          </Button>
        )}
        <Button type="primary" icon={<FileAddOutlined />} onClick={toggleModal}>
          Создать папку
        </Button>
        <UploadButton uploadOptions={uploadOptions} />
        {progress !== 0 && <Progress type="circle" percent={progress} width={32} status={status} />}
      </div>

      <List size="large" header={listTitle} dataSource={files} renderItem={(file) => <File file={file} />} />

      {isOverDrop && (
        <div className={styles.dragWrapper}>
          <Upload.Dragger {...uploadOptions} className={styles.dragger}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Перетащите файлы в эту область чтобы загрузить</p>
          </Upload.Dragger>
        </div>
      )}

      <CreateDirModal currentDir={currentDir} isLoading={isLoading} visible={visible} toggleModal={toggleModal} />
    </div>
  );
};

export default FileDisk;
