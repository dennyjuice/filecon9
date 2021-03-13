import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Routes } from '../../helpers';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: Routes.LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
