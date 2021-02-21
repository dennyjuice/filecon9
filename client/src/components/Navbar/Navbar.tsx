import React from 'react';
import { Button } from 'antd';

import styles from './Navbar.module.scss';
import logo from '../assets/87100.svg';

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className="container">
      <div className={styles.menu}>
        <img className={styles.logo} src={logo} alt="" />
        <div className={styles.title}>Filecon9</div>
        <Button className={styles.btnSign}>Войти</Button>
        <Button>Регистрация</Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
