import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
      {isAuth && <Redirect to={Routes.FILES} />}
      <Navbar />
      <main className={cn(styles.content, 'container')}>
        <Switch>
          <Route
            exact
            path={Routes.HOME}
            render={() => {
              if (!isAuth) {
                return <p>Cloud storage</p>;
              }
              return null;
            }}
          />
          <PrivateRoute exact path={Routes.FILES} component={FileDisk} />

          <Route exact path={Routes.REGISTRATION} component={SignUpForm} />
          <Route exact path={Routes.LOGIN} component={SignInForm} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
