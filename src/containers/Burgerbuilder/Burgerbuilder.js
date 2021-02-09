import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControllers from '../../components/Burger/BurgerContollers/BurgerControllers'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-instance'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import { add_ingredients, remove_ingredients } from '../../redux/actions/actionsBurgerBuilder'



export class Burgerbuilder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: false

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
        this.props.history.push('/checkout')
    }

    componentDidMount(){
        // axios.get('https://burger-3ca8b-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(res =>
        //         this.setState({ingredients: res.data}),
        //     )
        //     .catch(error=>{
        //         this.setState({error: true})
        //     })
            
    }

    render() {
        let orderSumary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : ( <Spinner /> )
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
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addHandler: (ingName) => dispatch(add_ingredients(ingName)),
        removeHandler: (ingName) => dispatch(remove_ingredients(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Burgerbuilder, axios))
