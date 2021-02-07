import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from'./ContactData.module.css'
import axios from '../../../axios-instance'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'


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
            loading: false
        }
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState( { loading: true } );
      
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            UserDetails: {
                name: "user_1",	
                Address: "Berlin Metropolitan Germany"	
            },	
            delivery: "fastest"
        }

        axios.post('/orders.json', order)
            .then(res =>  this.setState({loading: false}), this.props.history.push("/") )
            .catch(err => this.setState({loading: false}) )
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

        if ( this.state.loading ) {
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
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData)
