import React from 'react'
import Button from '../../UI/Button/Button'

function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]} </li>
        })   
    return (
        <div>
            <h3>Your Order</h3>
            <p>Please review your order before checking out</p>
            <p>{ingredientSummary}</p>
            <p> <strong>Total:</strong> ${props.totalprice} </p>
            <div><Button btnClass="Success" clicked={props.continuepurchasingHandler}>Continue</Button></div>
            <div><Button btnClass="Danger" clicked={props.purchasingHandler}>Cancel</Button></div>
        </div>
    )
}

export default OrderSummary
