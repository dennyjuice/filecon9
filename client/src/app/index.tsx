import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getCurrentUser } from '../features/User/userSlice';
import Navbar from '../components/Navbar';
import PrivateRoute from '../components/PrivateRoute';
import FileDisk from '../features/FileDisk';
import RegisterForm from '../features/User/RegisterForm/RegisterForm';
import AuthForm from '../features/User/AuthForm/AuthForm';
import styles from './styles.module.scss';
import { Routes } from '../helpers';

const DebugRouter = ({ children }: { children: any }) => {
  const { location } = useHistory();
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`Route: ${location.pathname}${location.search}, State: ${JSON.stringify(location.state)}`);
  }

  return children;
};

const App = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('fcToken')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <main className={cn(styles.content, 'container')}>
        <DebugRouter>
          <Switch>
            <Route
              exact
              path={Routes.HOME}
              render={() => {
                if (!isAuth) {
                  return <p>Тут будет описание</p>;
                }
                return <Redirect to={Routes.FILES} />;
              }}
            />
            <PrivateRoute exact path={[Routes.FILES, `${Routes.FILES}/:dirId`]} component={FileDisk} />

            <Route exact path={Routes.REGISTRATION} component={RegisterForm} />
            <Route exact path={Routes.LOGIN} component={AuthForm} />
          </Switch>
        </DebugRouter>
      </main>
    </Router>
  );
};

export default App;
