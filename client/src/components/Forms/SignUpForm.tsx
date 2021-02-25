import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { authUser, clearServerMessages } from '../../redux/slices/userSlice';

import styles from './Forms.module.scss';
import { IForm } from '../../types';
import { EndPoints } from '../../helpers';

const SignUpForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { serverMessage, isLoading } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (serverMessage.error) {
      message.error(serverMessage.error);
    }
    if (serverMessage.message) {
      message.success(serverMessage.message);
    }

    return () => {
      dispatch(clearServerMessages());
    };
  }, [dispatch, serverMessage.error, serverMessage.message]);

  const onFinish = (values: IForm) => {
    dispatch(authUser({ endPoint: EndPoints.REGISTRATION, userData: values }));
  };

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
