import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { List, Button } from 'antd';
import { LeftOutlined, FileAddOutlined } from '@ant-design/icons';
import { getFiles } from '../../redux/slices/fileSlice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import File from './File';
import styles from './File.module.scss';

const FileDisk = () => {
  const { files, currentDir } = useTypedSelector((state) => state.files);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className={styles.navButtons}>
        <Button icon={<LeftOutlined />}>Назад</Button>
        <Button type="primary" icon={<FileAddOutlined />}>
          Создать папку
        </Button>
      </div>
      <List size="large" header={listTitle} dataSource={files} renderItem={(file) => <File file={file} />} />
    </>
  );
};

export default FileDisk;
