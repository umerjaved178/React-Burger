import React, { Component } from 'react'
import CheckoutSummary from '../../components/orderSection/CheckoutSummary/CheckoutSummary'
import {Route} from "react-router-dom";
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ingredients: {
                 salad: 1,
                 meat: 1,
                 cheese: 1,
                 bacon: 1
             },
             totalPrice: 0
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for (let param of query.entries()) {
            if(param[0] === 'price'){
                 price = param[1]
            } else{
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    checkoutCancel = {this.checkoutCancelHandler}
                    checkoutContinue = {this.checkoutContinueHandler}
                    ingredients={this.state.ingredients}/>
                <Route path={this.props.match.path + "/contact-data"} render={(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} /> 
            </div>
        )
    }
}

export default Checkout
