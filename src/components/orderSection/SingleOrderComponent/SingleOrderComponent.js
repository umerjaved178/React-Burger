import React from 'react'
import classes from './SingleOrderComponent.module.css'

function SingleOrderComponent(props) {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    const ingredientsOutput = ingredients.map(ig =>{
        return <span key={ig.name} style={{textTransform: 'capitalize', display: 'inline-block', margin: "0 10px",padding: "5px", border: "1px solid #ccc"}}> 
                    {ig.name} ({ig.amount}) 
                </span>
    })

    return (
        <div className={classes.SingleOrderComponent}>
            <p>Ingredients:  {ingredientsOutput} </p>
        <p>Price: $ {props.totalPrice}</p>
        </div>
    )
}

export default SingleOrderComponent
