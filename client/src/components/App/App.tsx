import React from 'react';
import Navbar from '../Navbar';

import SignUpForm from '../Forms';
import styles from './App.module.scss';

const App = () => (
  <>
    <Navbar />
    <main className={styles.content}>
      <div className="container center">
        <SignUpForm />
      </div>
    </main>
  </>
);

export default App;
