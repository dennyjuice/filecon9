import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { authUser, clearServerMessages } from '../../redux/slices/userSlice';
import { EndPoints } from '../../helpers';
import { IForm } from '../../types';
import styles from './Forms.module.scss';

const SignUpForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { serverMessage, isLoading } = useTypedSelector((state) => state.user);

  const onFinish = (values: IForm) => {
    dispatch(authUser({ endPoint: EndPoints.LOGIN, userData: values }));
  };

  useEffect(() => {
    if (serverMessage.error) {
      message.error(serverMessage.error);
    }

    return () => {
      dispatch(clearServerMessages());
    };
  }, [dispatch, serverMessage.error]);

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
