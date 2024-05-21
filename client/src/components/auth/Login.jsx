import React, { useState } from "react";
import "./registration.css"
import Input from "../../utils/input/input";
import { login } from "../../actions/user";
import {useDispatch} from "react-redux"

const Login = () => {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const dispatch = useDispatch()
    return(
        <div className="registration">
            <div className="registration-header">Вход</div>
            <Input type="text" placeholder="Введите email..." value={email} setValue={setEmail}/>
            <Input type="password" placeholder="Введите пароль..." value={password} setValue={setPassword}/>
            <button type="button" className="auth-button" onClick={() =>dispatch(login(email, password))}>Войти</button>
        </div>
    )
}

export default Login