import React from "react";
import './input.css'

const Input = (props) =>{
    return(
        <input onChange={(event)=>props.setValue(event.target.value)} type={props.type} placeholder={props.placeholder} value={props.value} />
    )
}

export default Input;