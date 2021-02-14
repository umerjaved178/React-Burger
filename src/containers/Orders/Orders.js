import React, { Component } from "react";
// import axios from '../../axios-instance'
import { connect } from "react-redux";
import SingleOrderComponent from "../../components/orderSection/SingleOrderComponent/SingleOrderComponent";
import { fetching_orders_async } from "../../redux/actions/order";

export class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.fetching_orders_async(this.props.token, this.props.userId);
    // axios.get("/orders.json")
    // .then(res => {
    //     let fetchedOrders = []
    //     for (let key in res.data){
    //         fetchedOrders.push({
    //             ...res.data[key],
    //             id: key
    //         })
    //     }
    //     this.setState({loading: false, orders: fetchedOrders})
    // })
    // .catch(err =>{this.setState({loading: false})})
  }

  render() {
    return (
      <div>
        {this.props.orders.map((order) => (
          <SingleOrderComponent
            key={order.id}
            ingredients={order.ingredients}
            totalPrice={order.totalPrice}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetching_orders_async: (token, userId) => dispatch(fetching_orders_async(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
