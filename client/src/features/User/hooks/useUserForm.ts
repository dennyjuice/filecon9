import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { authUser, clearServerMessages } from '../userSlice';
import { EndPoints } from '../../../helpers';
import { IForm } from '../../../services';

interface LocationState {
  from: {
    pathname: string;
  };
}

const useUserForm = (endPoint: EndPoints) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { serverMessage, isLoading, isAuth } = useAppSelector((state) => state.user);
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/' } };

  const onFinish = (values: IForm) => {
    dispatch(authUser({ endPoint, userData: { ...values, email: values.email.toLowerCase() } })).then(() =>
      history.replace(from),
    );
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

  return { form, isLoading, onFinish, isAuth, from };
};

export default useUserForm;
