import React, { Component } from 'react'
import axios from '../../axios-instance'
import SingleOrderComponent from '../../components/orderSection/SingleOrderComponent/SingleOrderComponent'

export class Orders extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             orders: [],
             loading: true
        }
    }
    
    componentDidMount() {
        axios.get("/orders.json")
        .then(res => {
            let fetchedOrders = []
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(err =>{this.setState({loading: false})})
        console.log(this.state.orders)
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <SingleOrderComponent key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice} />
                ))}
            </div>
        )
    }
}

export default Orders
