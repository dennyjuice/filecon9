import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { logOut } from '../../redux/slices/userSlice';
import { Routes } from '../../helpers';
import styles from './Navbar.module.scss';
import logo from '../assets/87100.svg';

const Navbar = () => {
  const { isAuth, currentUser } = useTypedSelector((state) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const logOutHandler = () => {
    localStorage.removeItem('fcToken');
    dispatch(logOut());
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.menu}>
        <div className={styles.title}>
          <Link to={isAuth ? Routes.FILES : Routes.HOME}>
            <img className={styles.logo} src={logo} alt="" />
            Filecon9
          </Link>
        </div>

        {!isAuth && (
          <>
            <Link to={Routes.LOGIN}>
              <Button className={styles.btnSign}>Войти</Button>
            </Link>

            <Link to={Routes.REGISTRATION}>
              <Button>Регистрация</Button>
            </Link>
          </>
        )}

        {isAuth && (
          <>
            <span>{currentUser.username}</span>
            <Button onClick={logOutHandler}>Выйти</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
