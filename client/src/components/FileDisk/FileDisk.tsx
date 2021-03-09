import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { List, Button } from 'antd';
import { LeftOutlined, FileAddOutlined } from '@ant-design/icons';
import { getFiles } from '../../redux/slices/fileSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import File from './File';
import CreateDirModal from '../blocks/CreateDirModal';
import styles from './File.module.scss';

const FileDisk = () => {
  const { files, currentDir, isLoading } = useTypedSelector((state) => state.files);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [dispatch, currentDir]);

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

  return (
    <>
      <div className={styles.navButtons}>
        <Button icon={<LeftOutlined />}>Назад</Button>
        <Button type="primary" icon={<FileAddOutlined />} onClick={toggleModal}>
          Создать папку
        </Button>
      </div>
      <List size="large" header={listTitle} dataSource={files} renderItem={(file) => <File file={file} />} />
      <CreateDirModal currentDir={currentDir} isLoading={isLoading} visible={visible} toggleModal={toggleModal} />
    </>
  );
};

export default FileDisk;
