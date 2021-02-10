import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControllers from '../../components/Burger/BurgerContollers/BurgerControllers'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-instance'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import { add_ingredients, remove_ingredients, init_ingredients } from '../../redux/actions/actionsBurgerBuilder'
import { purchased_redirection } from '../../redux/actions/order'


export class Burgerbuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            purchaseable: false,
            purchasing: false,
            loading: false,
        }
    }

    purchasingHandler = () => {
        this.setState((prevState)=>({purchasing: !prevState.purchasing}))
    }

    purchaseableHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKeys => 
                                                    { return ingredients[igKeys]} 
                                                ).reduce((sum, el)=> {return sum+el},0 )
        return sum > 0
    }    

    continuepurchasingHandler = () => {
        this.props.purchased_redirection()
        this.props.history.push('/checkout')
    }

    componentDidMount(){
        this.props.initIngredients()
    }

    render() {
        let orderSumary = null
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : ( <Spinner /> )
        if(this.props.ings){
            orderSumary = <OrderSummary 
                                ingredients={this.props.ings} 
                                purchasingHandler={this.purchasingHandler} 
                                continuepurchasingHandler={this.continuepurchasingHandler} 
                                totalprice={this.props.price} /> 
        }
        
        if (this.state.loading){
            orderSumary = (<Spinner />)
        }
        
        if(this.props.ings){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControllers 
                        addIngredientHandler={this.props.addHandler} 
                        removeIngredientHandler={this.props.removeHandler} 
                        ingredients={this.props.ings}
                        totalPrice= {this.props.price}
                        purchaseable={this.purchaseableHandler(this.props.ings)}
                        purchasingHandler={this.purchasingHandler}
                        />
                </React.Fragment>
            )
        }       

        return (
            <div>
                <Modal show={this.state.purchasing} purchasingHandler={this.purchasingHandler}> 
                    {orderSumary}
                </Modal>
                {burger}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addHandler: (ingName) => dispatch(add_ingredients(ingName)),
        removeHandler: (ingName) => dispatch(remove_ingredients(ingName)),
        initIngredients: () => dispatch(init_ingredients()),
        purchased_redirection: () => dispatch(purchased_redirection()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Burgerbuilder, axios))
