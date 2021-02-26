import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, message } from 'antd';
import { useTypedSelector } from './useTypedSelector';
import { authUser, clearServerMessages } from '../redux/slices/userSlice';
import { IForm } from '../types';
import { EndPoints } from '../helpers';

const useUserForm = (endPoint: EndPoints) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { serverMessage, isLoading } = useTypedSelector((state) => state.user);

  const onFinish = (values: IForm) => {
    dispatch(authUser({ endPoint, userData: values }));
  };

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

  return { form, isLoading, onFinish };
};

export default useUserForm;
