import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from'./ContactData.module.css'
// import axios from '../../../axios-instance'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import {order_process_async} from '../../../redux/actions/order'


export class ContactData extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: '',	            
            email: '',	                
            address: {	                    
                street: '',	                    
                postalCode: ''	                   
            },	                       
        }
    }

    orderHandler = (e) => {
        e.preventDefault();
      
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            UserDetails: {
                name: "user_1",	
                Address: "Berlin Metropolitan Germany"	
            },	
            delivery: "fastest"
        }

        this.props.order_process_async(order)
    }
   


    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street No#" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnClass="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )

        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        order_process_async: (order) => dispatch(order_process_async(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData)
