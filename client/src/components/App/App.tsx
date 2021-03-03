import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import cn from 'classnames';

import Navbar from '../Navbar';
import PrivateRoute from '../PrivateRoute';
import FileDisk from '../FileDisk';
import { SignUpForm, SignInForm } from '../Forms';
import { Routes } from '../../helpers';
import styles from './App.module.scss';

const App = () => (
  <Router>
    <Navbar />
    <main className={cn(styles.content, 'container')}>
      <Switch>
        <PrivateRoute exact path={Routes.HOME} component={FileDisk} />

        <Route exact path={Routes.REGISTRATION} component={SignUpForm} />
        <Route exact path={Routes.LOGIN} component={SignInForm} />
      </Switch>
    </main>
  </Router>
);

export default App;
