import React from 'react'
import classes from './Button.module.css'

function Button(props) {
    return (
        <div className={[classes.Button, classes[props.btnClass]].join(' ')} onClick={props.clicked}>
            {props.children}
        </div>
    )
}

export default Button 
