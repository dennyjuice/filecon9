import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { Routes } from '../../helpers';
import styles from './Navbar.module.scss';
import logo from '../assets/87100.svg';

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.menu}>
      <div className={styles.title}>
        <Link to={Routes.HOME}>
          <img className={styles.logo} src={logo} alt="" />
          Filecon9
        </Link>
      </div>

      <Link to={Routes.LOGIN}>
        <Button className={styles.btnSign}>Войти</Button>
      </Link>

      <Link to={Routes.REGISTRATION}>
        <Button>Регистрация</Button>
      </Link>
    </div>
  </nav>
);

export default Navbar;
