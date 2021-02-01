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
        .then(res => console.log(res.data))
    }

    render() {
        return (
            <div>
                <SingleOrderComponent />
                <SingleOrderComponent />
            </div>
        )
    }
}

export default Orders
