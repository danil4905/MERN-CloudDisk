import React,{useState} from 'react';
import './navbar.scss'
import Logo from '../../assets/img/navbar-logo.svg'
import {useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from '../../redux/reducers/userReducer';
import {getFiles, searchFiles} from "../../redux/actions/file";
import {showLoader} from "../../redux/reducers/appReducer";

const Navbar = ({ isAuth, dispatch }) => {
    const currentDir = useSelector(state => state.files.currentDir)
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className="navbar__logo" />
                <div className="navbar__header">MERN CLOUD</div>
                {isAuth && <input
                    value={searchName}
                    onChange={e => searchChangeHandler(e)}
                    className='navbar__search'
                    type="text"
                    placeholder="Название файла..."/>}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logOut())}>Выход</div>}
            </div>
        </div>
    );
};

export default Navbar;