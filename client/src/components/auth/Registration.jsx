import React, { useState } from "react";
import "./registration.css"
import Input from "../../utils/input/input";
import { registration } from "../../actions/user";

const Registration = () => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    return(
        <div className="registration">
            <div className="registration-header">Регистрация</div>
            <Input type="text" placeholder="Введите email..." value={email} setValue={setEmail}/>
            <Input type="password" placeholder="Введите пароль..." value={password} setValue={setPassword}/>
            <button className="auth-button" onClick={() => registration(email, password)}>Войти</button>
        </div>
    )
}

export default Registration