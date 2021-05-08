import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { createDir } from '../fileSlice';

import styles from './styles.module.scss';

interface ModalProps {
  currentDir: string;
  isLoading: boolean;
  visible: boolean;
  toggleModal: () => void;
}

const CreateDirModal = ({ currentDir, isLoading, visible, toggleModal }: ModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

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
