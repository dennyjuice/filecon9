import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getCurrentUser } from '../../redux/slices/userSlice';
import Navbar from '../Navbar';
import PrivateRoute from '../PrivateRoute';
import FileDisk from '../FileDisk';
import { SignUpForm, SignInForm } from '../Forms';
import { Routes } from '../../helpers';
import { AppDispatch } from '../../redux/store';
import styles from './App.module.scss';

const DebugRouter = ({ children }: { children: any }) => {
  const { location } = useHistory();
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`Route: ${location.pathname}${location.search}, State: ${JSON.stringify(location.state)}`);
  }

  return children;
};

const App = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  const dispatch: AppDispatch = useDispatch();

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

            <Route exact path={Routes.REGISTRATION} component={SignUpForm} />
            <Route exact path={Routes.LOGIN} component={SignInForm} />
          </Switch>
        </DebugRouter>
      </main>
    </Router>
  );
};

export default App;
