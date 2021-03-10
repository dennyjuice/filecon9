import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { createDir } from '../../../redux/slices/fileSlice';
import { AppDispatch } from '../../../redux/store';
import styles from './CreateDirModal.module.scss';

interface IModalProps {
  currentDir: string;
  isLoading: boolean;
  visible: boolean;
  toggleModal: () => void;
}

const CreateDirModal: React.FC<IModalProps> = ({ currentDir, isLoading, visible, toggleModal }) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();

  const createDirHandler = (dirId: string, name: string) => {
    dispatch(createDir({ name, type: 'dir', parent: dirId })).then(() => {
      form.resetFields();
      toggleModal();
    });
  };

  return (
    <Modal title="Создать папку" visible={visible} footer={null} onCancel={toggleModal}>
      <Form form={form} name="basic" onFinish={({ name }) => createDirHandler(currentDir, name)}>
        <Form.Item name="name" rules={[{ required: true, message: 'Введите название папки!' }]}>
          <Input type="name" placeholder="Введите название папки" />
        </Form.Item>

        <Form.Item className={styles.createButton}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDirModal;
