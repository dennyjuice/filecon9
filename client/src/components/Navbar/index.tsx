import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../features/User/userSlice';
import { Routes } from '../../helpers';
import styles from './styles.module.scss';
import logo from '../../assets/87100.svg';
import SearchFiles from '../../features/FileDisk/Search';

const Navbar = () => {
  const { isAuth, currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const logOutHandler = () => {
    localStorage.removeItem('fcToken');
    dispatch(logOut());
    history.push(Routes.HOME);
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
            <SearchFiles className={styles.searchInput} />
            <span>{currentUser.username}</span>
            <Button onClick={logOutHandler}>Выйти</Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
