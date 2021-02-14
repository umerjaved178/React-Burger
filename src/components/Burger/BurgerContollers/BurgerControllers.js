import React from 'react'
import BurgerController from './BurgerController/BurgerController'
import classes from './BurgerControllers.module.css'

function BurgerControllers(props) {
    const controls = [
        {label: "Salad", type: "salad"},
        {label: "Bacon", type: "bacon"},
        {label: "Cheese", type: "cheese"},
        {label: "Meat", type: "meat"},
    ]

    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong> ${props.totalPrice} </strong> </p>
            {controls.map(single => <BurgerController 
                                        key={single.label} 
                                        label={single.label} 
                                        addIngredientHandler={()=>props.addIngredientHandler(single.type)} 
                                        removeIngredientHandler={()=>props.removeIngredientHandler(single.type)} 
                                        disabled={props.ingredients[single.type] <= 0? true : false}
                                        />)}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.purchasingHandler}>
               {props.isAuth ? "ORDER NOW" : "Authenticate First"} 
            </button>
        </div>
    )
}

export default BurgerControllers
