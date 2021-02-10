import {ORDER_SUCCESSFUL, ORDER_FAILED, ORDER_START} from './types'
import axios from '../../axios-instance'


export const order_successful = (orderId, orderDetails) => {
    return {
        type: ORDER_SUCCESSFUL,
        orderId: orderId,
        orderDetails: orderDetails,
    }
}

export const order_failed = (error) => {
    return {
        type: ORDER_FAILED,
        error: error
    }
}

export const order_start = () => {
    return {
        type: ORDER_START
    }
}

export const order_process_async = (order_data) => {
    return dispatch => {
        dispatch(order_start())
        axios.post('/orders.json', order_data)
            .then(res =>  dispatch(order_successful(res.data.name, order_data)))
            .catch(err => dispatch(order_failed(err)))
    }
}
