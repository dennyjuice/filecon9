import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, message } from 'antd';
import { useTypedSelector } from './useTypedSelector';
import { AppDispatch } from '../redux/store';
import { authUser, clearServerMessages } from '../redux/slices/userSlice';
import { IForm } from '../types';
import { EndPoints } from '../helpers';

const useUserForm = (endPoint: EndPoints) => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const { serverMessage, isLoading, isAuth } = useTypedSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation();

  const { from }: any = location.state || { from: { pathname: '/' } };

  const onFinish = (values: IForm) => {
    dispatch(authUser({ endPoint, userData: values })).then(() => history.replace(from));
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

  return { form, isLoading, onFinish, isAuth };
};

export default useUserForm;
