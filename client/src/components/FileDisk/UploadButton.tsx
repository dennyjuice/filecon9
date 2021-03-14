import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import styles from './File.module.scss';

const UploadButton: React.FC<{ uploadOptions: any }> = ({ uploadOptions }) => (
  <Upload {...uploadOptions} className={styles.upload}>
    <Button icon={<UploadOutlined />}>Загрузить файл</Button>
  </Upload>
);

export default UploadButton;
