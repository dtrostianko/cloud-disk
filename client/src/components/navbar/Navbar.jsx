import React from "react";
import './navbar.css'
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { logout } from "../../reducers/userReducer";

const Navbar =() =>{
    const isAuth = useSelector(state =>state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className="navbar">
            <div className="container">
                <img src="" alt="" className="navbar__logo"/>
                {!isAuth &&<div className="navbar-login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className="navbar-registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar-logout" onClick={()=>dispatch(logout())}>Выйти</div>}
            </div>
        </div>
    )
}

export default Navbar