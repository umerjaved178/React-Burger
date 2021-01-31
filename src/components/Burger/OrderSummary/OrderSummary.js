import React from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary  extends React.Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]} </li>
            }) 
        return (
            <div>
                <h3>Your Order</h3>
                <p>Please review your order before checking out</p>
                <p>{ingredientSummary}</p>
                <p> <strong>Total:</strong> ${this.props.totalprice} </p>
                <div><Button btnClass="Success" clicked={this.props.continuepurchasingHandler}>Continue</Button></div>
                <div><Button btnClass="Danger" clicked={this.props.purchasingHandler}>Cancel</Button></div>
            </div>
        )
    }
}

export default OrderSummary
