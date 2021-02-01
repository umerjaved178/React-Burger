import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'


function CheckoutSummary(props) {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnClass="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
            <Button btnClass="Danger" clicked={props.checkoutCancel}>BACK</Button>
        </div>
    )
}

export default CheckoutSummary
