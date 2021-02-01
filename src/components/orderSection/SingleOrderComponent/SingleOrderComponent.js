import React from 'react'
import classes from './SingleOrderComponent.module.css'

function SingleOrderComponent(props) {
    return (
        <div className={classes.SingleOrderComponent}>
            <p>Ingredients: Salad(props.ingredients["salad"]), 
                    Bacon(props.ingredients["bacon"]), 
                    Cheese(props.ingredients["cheese"]), 
                    Meat(props.ingredients["meat"])</p>
        <p>Price: $ {props.totalPrice}</p>
        </div>
    )
}

export default SingleOrderComponent
