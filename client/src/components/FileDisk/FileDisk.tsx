import React, { useEffect, useLayoutEffect, useState } from 'react';
import { List, Button } from 'antd';
import { LeftOutlined, FileAddOutlined } from '@ant-design/icons';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { getFiles, setCurrentDir } from '../../redux/slices/fileSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import File from './File';
import UploadButton from './UploadButton';
import CreateDirModal from '../blocks/CreateDirModal';
import styles from './File.module.scss';

interface RouterProps {
  dirId: string;
}

const FileDisk = ({ match }: RouteComponentProps<RouterProps>) => {
  const { files, currentDir, isLoading } = useAppSelector((state) => state.files);
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
    <>
      <div className={styles.navButtons}>
        {currentDir && (
          <Button icon={<LeftOutlined />} onClick={backClickHandler}>
            Назад
          </Button>
        )}
        <Button type="primary" icon={<FileAddOutlined />} onClick={toggleModal}>
          Создать папку
        </Button>
        <UploadButton currentDir={currentDir} />
      </div>
      <List size="large" header={listTitle} dataSource={files} renderItem={(file) => <File file={file} />} />
      <CreateDirModal currentDir={currentDir} isLoading={isLoading} visible={visible} toggleModal={toggleModal} />
    </>
  );
};

export default FileDisk;
