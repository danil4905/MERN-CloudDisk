import React from "react";
import './profile.scss';


const ProfileInfo = (props) => {
    return (
        <div className="profile__info">
            <ul className="profile__list">
                <li className="profile__list-item"><span className="profile__info-item">Имя: </span><span className="profile__info-item">{props.name}</span></li>
                <li className="profile__list-item"><span className="profile__info-item">Фамилия: </span><span className="profile__info-item">{props.surname}</span></li>
                <li className="profile__list-item"><span className="profile__info-item">Email: </span><span className="profile__info-item">{props.email}</span></li>
            </ul>
            <button onClick={() => props.setEdit(true)}>Редактировать</button>
        </div>
    )
}

export default ProfileInfo;
