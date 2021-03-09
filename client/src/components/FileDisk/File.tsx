import React from 'react';
import { useDispatch } from 'react-redux';
import { List } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';
import { setCurrentDir } from '../../redux/slices/fileSlice';

import { AppDispatch } from '../../redux/store';
import { IFile } from '../../types';
import styles from './File.module.scss';

const File: React.FC<{ file: IFile }> = ({ file }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <List.Item
      className={styles.listItem}
      onClick={() => {
        const { _id: id, type } = file;
        if (type === 'dir') {
          dispatch(setCurrentDir(id));
        }
      }}
    >
      {file.type === 'dir' ? <FolderTwoTone className={styles.icon} /> : <div />}
      <span className={styles.name}>{file.name}</span>
      <span className={styles.date}>{file.date.toString().slice(0, 10)}</span>
      <span className={styles.size}>{file.type !== 'dir' && file.size}</span>
    </List.Item>
  );
};

export default File;
