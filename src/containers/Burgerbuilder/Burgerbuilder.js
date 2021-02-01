import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BurgerControllers from '../../components/Burger/BurgerContollers/BurgerControllers'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-instance'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


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
            ingredients: null,
            totalPrice: 4,
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
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    componentDidMount(){
        axios.get('https://burger-3ca8b-default-rtdb.firebaseio.com/ingredients.json')
            .then(res =>
                this.setState({ingredients: res.data}),
            )
            .catch(error=>{
                this.setState({error: true})
            })
            
    }

    render() {
        let orderSumary = null
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : ( <Spinner /> )
        if(this.state.ingredients){
            orderSumary = <OrderSummary 
                                ingredients={this.state.ingredients} 
                                purchasingHandler={this.purchasingHandler} 
                                continuepurchasingHandler={this.continuepurchasingHandler} 
                                totalprice={this.state.totalPrice} /> 
        }
        
        if (this.state.loading){
            orderSumary = (<Spinner />)
        }

        
        if(this.state.ingredients){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControllers 
                        addIngredientHandler={this.addIngredientHandler} 
                        removeIngredientHandler={this.removeIngredientHandler} 
                        ingredients={this.state.ingredients}
                        totalPrice= {this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
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

export default withErrorHandler(Burgerbuilder, axios)
