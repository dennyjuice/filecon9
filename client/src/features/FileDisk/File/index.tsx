import React from 'react';
import { List, Button, message } from 'antd';
import { FolderTwoTone, FileTwoTone, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { useAppDispatch } from '../../../hooks';
import styles from '../styles.module.scss';
import { Routes } from '../../../helpers';
import { downloadFile, deleteFileAction, deleteFile, IFile } from '../fileSlice';
import { sizeFormat } from '../../../utils';

interface FileProps {
  file: IFile;
}

const File = ({ file }: FileProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const downloadFileHandler = async () => {
    const { _id: id } = file;
    try {
      const response = await downloadFile(id);
      const url = window.URL.createObjectURL(new Blob([response.payload]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
    } catch {
      message.error('Error: Network Error');
    }
  };

  const deleteFileHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { _id: id } = file;

    dispatch(deleteFile(id)).then(() => dispatch(deleteFileAction(id)));
  };

  return (
    <List.Item
      className={styles.listItem}
      onClick={() => {
        const { _id: id, type } = file;
        if (type === 'dir') {
          history.push(`${Routes.FILES}/${id}`);
        }
      }}
    >
      {file.type === 'dir' ? <FolderTwoTone className={styles.icon} /> : <FileTwoTone className={styles.icon} />}
      <span className={styles.name}>{file.name}</span>
      {file.type !== 'dir' && (
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size="small"
          className={styles.downloadBtn}
          onClick={downloadFileHandler}
        />
      )}
      <Button
        danger
        shape="round"
        icon={<DeleteOutlined />}
        size="small"
        className={styles.deleteBtn}
        onClick={(event) => deleteFileHandler(event)}
      />

      <span className={styles.date}>{format(new Date(file.date), 'dd MMMM y', { locale: ru })}</span>
      <span className={styles.size}>{file.type !== 'dir' && sizeFormat(file.size)}</span>
    </List.Item>
  );
};

export default File;
