import React from 'react';
import './navbar.scss'
import Logo from '../../assets/img/navbar-logo.svg'
import { NavLink } from "react-router-dom";
import { logOut } from '../../redux/reducers/userReducer';
const Navbar = ({ isAuth, dispatch }) => {
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className="navbar__logo" />
                <div className="navbar__header">MERN CLOUD</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logOut())}>Выход</div>}
            </div>
        </div>
    );
};

export default Navbar;