import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../redux/actions/user";
import {NavLink} from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./EditProfile";
import './profile.scss'
import defaultAvatar from '../../assets/img/avatar.svg'
import {API_URL} from "../../config";

const Profile = (props) => {
    const dispatch = useDispatch()
    const[editMode,setEditMode] = useState(false)
    const user = useSelector(state => state.user.currentUser)
    const styleImage = {
    backgroundImage: `url(${API_URL}static/${user.avatar})`,
        backgroudSize: 'cover'
    }


    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className="profile__container">
            <div className="profile__controls">
                <NavLink className="profile__controls-back" to="/">Назад</NavLink>
                <button onClick={() => dispatch(deleteAvatar())} className="profile__controls-delete">Удалить аватар</button>
            </div>
            <div className="profile">
                <div className='profile__avatar'  >
                    <img src={user.avatar?API_URL+'static/'+user.avatar:defaultAvatar} alt=""/>
                    <div className='avatar__upload'>
                    <input accept="image/*" onChange={e => changeHandler(e)} type="file" placeholder="Загрузить аватар"/>
                    </div>
                </div>
                {!editMode
                    ? <ProfileInfo email={user.email} name={user.name} surname={user.surname} setEdit={setEditMode}/>
                    :<EditProfile email={user.email} name={user.name} surname={user.surname} setEdit={setEditMode}/>
                }
            </div>
        </div>
    );
};

export default Profile;
