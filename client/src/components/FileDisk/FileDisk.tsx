import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { List } from 'antd';
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

  return <List size="large" header={listTitle} dataSource={files} renderItem={(file) => <File file={file} />} />;
};

export default FileDisk;
