import React, { Component } from 'react'
import CheckoutSummary from '../../components/orderSection/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from "react-router-dom";
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'

export class Checkout extends Component {

    checkoutContinueHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    render() {
        let burger_template = <Redirect to="/" />
        if (this.props.ings) {
            let redirection = this.props.purchased ? <Redirect to="/" /> : null;
            burger_template = (
                <div>
                {redirection}
                <CheckoutSummary 
                    checkoutCancel = {this.checkoutCancelHandler}
                    checkoutContinue = {this.checkoutContinueHandler}
                    ingredients={this.props.ings}/>
                </div>)
        }
        
        return (
            <div>
                {burger_template}
                <Route path={this.props.match.path + "/contact-data"} 
                component = {ContactData}
                /> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        purchased: state.orderReducer.purchased,
    };
}

export default connect(mapStateToProps)(Checkout)
