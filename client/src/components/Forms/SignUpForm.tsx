import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import useUserForm from '../../hooks/useUserForm';

import styles from './Forms.module.scss';
import { EndPoints } from '../../helpers';

const SignUpForm = () => {
  const { form, isLoading, onFinish } = useUserForm(EndPoints.REGISTRATION);

  return (
    <div className="center">
      <Form form={form} className={styles.form} name="basic" initialValues={{ privacy: true }} onFinish={onFinish}>
        <h2>Регистрация</h2>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Пожалуйста введите никнейм!' },
            { min: 3, message: 'Должно быть больше 3 символов' },
          ]}
        >
          <Input prefix={<UserOutlined className={styles.inputIcon} />} placeholder="Введите никнейм" />
        </Form.Item>

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

        <Form.Item name="privacy" valuePropName="checked">
          <Checkbox>I agree with terms</Checkbox>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
            >
              Зарегистрироваться
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
