import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadButton: React.FC<{ uploadOptions: any }> = ({ uploadOptions }) => (
  <Upload {...uploadOptions}>
    <Button icon={<UploadOutlined />}>Загрузить файл</Button>
  </Upload>
);

export default UploadButton;
