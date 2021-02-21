import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import styles from './Forms.module.scss';

const SignUpForm = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className={styles.form}
      name="basic"
      initialValues={{ privacy: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h2>Регистрация</h2>
      <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста введите никнейм!' }]}>
        <Input prefix={<UserOutlined className={styles.inputIcon} />} placeholder="Введите никнейм" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Пожалуйста введите email!' }]}>
        <Input prefix={<MailOutlined className={styles.inputIcon} />} placeholder="Введите email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}>
        <Input.Password prefix={<LockOutlined className={styles.inputIcon} />} />
      </Form.Item>
      <Form.Item name="privacy" valuePropName="checked">
        <Checkbox>I agree with terms</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
