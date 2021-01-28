import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControllers from '../../components/Burger/BurgerContollers/BurgerControllers'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'

const PRICES = {
    salad: 0.5,
    bacon: 1.5,
    cheese: 1,
    meat: 2,
}

export class Burgerbuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            purchaseable: false,
            purchasing: false

        }
    }

    purchasingHandler = () => {
        this.setState((prevState)=>({purchasing: !prevState.purchasing}))
    }

    purchaseableHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKeys => { return ingredients[igKeys]} ).reduce((sum, el)=> {return sum+el},0 )
        this.setState({purchaseable: sum > 0})
    }    
    addIngredientHandler = (type) => {
        let stateCopy = {...this.state.ingredients}
        stateCopy[type] = stateCopy[type] + 1
        this.setState({
            ingredients: stateCopy,
            totalPrice: this.state.totalPrice + PRICES[type]
        })
        this.purchaseableHandler(stateCopy)
    }

    removeIngredientHandler = (type) => {
        let stateCopy = {...this.state.ingredients}
        if (stateCopy[type] <= 0){
            return
        }
        stateCopy[type] = stateCopy[type] - 1
        this.setState({
            ingredients: stateCopy,
            totalPrice: this.state.totalPrice - PRICES[type]
        })
        this.purchaseableHandler(stateCopy)
    }

    continuepurchasingHandler = () => {
        alert("Continue")
    }

    render() {

        return (
            <div>
                <Modal show={this.state.purchasing} purchasingHandler={this.purchasingHandler}> 
                    <OrderSummary ingredients={this.state.ingredients} purchasingHandler={this.purchasingHandler} continuepurchasingHandler={this.continuepurchasingHandler} totalprice={this.state.totalPrice} /> 
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControllers 
                    addIngredientHandler={this.addIngredientHandler} 
                    removeIngredientHandler={this.removeIngredientHandler} 
                    ingredients={this.state.ingredients}
                    totalPrice= {this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    purchasingHandler={this.purchasingHandler}
                    />
            </div>
        )
    }
}

export default Burgerbuilder
