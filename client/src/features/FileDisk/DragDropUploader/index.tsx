import React from 'react';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import cn from 'classnames';
import styles from '../styles.module.scss';
import useDragDropUpload from '../hooks/useDragDropUpload';

const DragDropUploader = ({ cln: clase }: any) => {
  const { dropHandlers, isOverDrop } = useDragDropUpload();

  const uploadOptions = {
    name: 'file',
    customRequest: dropHandlers.onDrop,
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

  console.log(isOverDrop);

  return (
    <div className={cn(styles.dragWrapper, clase)}>
      <Upload.Dragger {...uploadOptions} className={styles.dragger}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Перетащите файлы в эту область чтобы загрузить</p>
      </Upload.Dragger>
    </div>
  );
};

export default DragDropUploader;
