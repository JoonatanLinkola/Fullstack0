import React from "react";

const Button = ({ handleClick, name }) => {
    return(
        <button onClick={handleClick}>{name}</button>
    )
}

export default Button