import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Routes } from '../../helpers';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { isAuth } = useTypedSelector((state) => state.user);
  return <Route {...rest} render={(props) => (isAuth ? <Component {...props} /> : <Redirect to={Routes.LOGIN} />)} />;
};

export default PrivateRoute;
