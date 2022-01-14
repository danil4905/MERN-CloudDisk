import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../redux/actions/user";
import {NavLink} from "react-router-dom";
import './profile.scss'

const Profile = () => {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className="container profile">
            <div className="profile__controls">
                <NavLink className="profile__controls-back" to="/">Назад</NavLink>
                <button onClick={() => dispatch(deleteAvatar())} className="profile__controls-delete">Удалить аватар</button>
            </div>
            <input accept="image/*" onChange={e => changeHandler(e)} type="file" placeholder="Загрузить аватар"/>
        </div>
    );
};

export default Profile;