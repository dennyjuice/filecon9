import React from 'react';
import { Button, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadButton = ({ uploadOptions }: { uploadOptions: UploadProps }) => (
  <Upload {...uploadOptions}>
    <Button icon={<UploadOutlined />}>Загрузить файл</Button>
  </Upload>
);

export default UploadButton;
