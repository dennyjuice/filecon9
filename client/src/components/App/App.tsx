import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import cn from 'classnames';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import Navbar from '../Navbar';
import { SignUpForm, SignInForm } from '../Forms';
import { Routes } from '../../helpers';
import styles from './App.module.scss';

const App = () => {
  const { isAuth } = useTypedSelector((state) => state.user);

  return (
    <Router>
      <Navbar />
      <main className={cn(styles.content, 'container')}>
        <Switch>
          <Route
            exact
            path={Routes.HOME}
            render={() => {
              if (!isAuth) {
                return <SignInForm />;
              }
              return null;
            }}
          />
          <Route exact path={Routes.REGISTRATION} component={SignUpForm} />
          <Route exact path={Routes.LOGIN} component={SignInForm} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
