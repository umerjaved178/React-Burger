import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

function Modal(props) {
    return (
        <React.Fragment>
            <Backdrop show={props.show} purchasingHandler={props.purchasingHandler}/>
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'traslateY(0)' : 'traslateY(-100)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default Modal
