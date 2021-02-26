import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import useUserForm from '../../hooks/useUserForm';

import { EndPoints } from '../../helpers';
import styles from './Forms.module.scss';

const SignUpForm = () => {
  const { form, isLoading, onFinish } = useUserForm(EndPoints.LOGIN);

  return (
    <div className="center">
      <Form form={form} className={styles.form} name="basic" onFinish={onFinish}>
        <h2>Авторизация</h2>

        <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Пожалуйста введите email!' }]}>
          <Input type="email" prefix={<MailOutlined className={styles.inputIcon} />} placeholder="Введите email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста введите пароль!' },
            { min: 8, message: 'Не меньше 8 символов' },
          ]}
        >
          <Input.Password prefix={<LockOutlined className={styles.inputIcon} />} />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
            >
              Войти
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
