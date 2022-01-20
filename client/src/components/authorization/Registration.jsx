import React, {useState} from 'react';
import './authorization.scss'
import Input from "../../utils/input/Input";
import {registration} from "../../redux/actions/user";

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={name} setValue={setName} type="text" placeholder="Введите имя..." required={true}/>
            <Input value={surname} setValue={setSurname} type="text" placeholder="Введите фамилию..." required={false}/>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..." required={true}/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."
                   required={true}/>
            <button className="authorization__btn" onClick={() => registration(email, password,name,surname)}
                    autoFocus={true}>Зарегистрироваться
            </button>
        </div>
    );
};

export default Registration;
