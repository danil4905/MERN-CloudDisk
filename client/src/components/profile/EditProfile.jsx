import React, {useState} from "react";
import Input from "../../utils/input/Input";
import './profile.scss'


const EditProfile = (props) => {
    const [email, setEmail] = useState(props.email);
    const [name, setName] = useState(props.name);
    const [surname, setSurname] = useState(props.surname);

    function handleSubmit() {

    }

    return (
        <div className='form-container'>
            <form className='form'>
                <label className='profile__label'>
                    <span className='profile__label-title'>Имя:</span>
                    <Input type='text' value={name} setValue={setName} required={true} placeholder='Имя:'/>
                </label>
                <label className='profile__label'>
                    <span className='profile__label-title'>Фамилия:</span>
                    <Input type='text' value={surname} setValue={setSurname} required={false} placeholder='Фамилия: '/>
                </label>
                <label className='profile__label'>
                    <span className='profile__label-title'>Email:</span>
                    <Input type='email' value={email} setValue={setEmail} required={true} placeholder="Email: "/>
                </label>
                <button type='submit'>Сохранить</button>
            </form>
            <button onClick={() => props.setEdit(false)}>Отмена</button>
        </div>
    )
}

export default EditProfile
