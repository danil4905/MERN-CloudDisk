import React from 'react';
import './input.scss'

const Input = (props) => {
    return (
        <input onChange={(event) => props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}
               required={props.required}/>
    );
};

export default Input;
