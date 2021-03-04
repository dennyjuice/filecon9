import React from 'react';
import { List } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';

import { IFile } from '../../types';
import styles from './File.module.scss';

const File: React.FC<{ file: IFile }> = ({ file }) => (
  <List.Item className={styles.listItem}>
    {file.type === 'dir' ? <FolderTwoTone className={styles.icon} /> : <div />}
    <span className={styles.name}>{file.name}</span>
    <span className={styles.date}>{file.date.toString().slice(0, 10)}</span>
    <span className={styles.size}>{file.type !== 'dir' && file.size}</span>
  </List.Item>
);

export default File;
