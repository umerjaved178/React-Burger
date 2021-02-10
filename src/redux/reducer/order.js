import {ORDER_SUCCESSFUL, ORDER_FAILED, ORDER_START} from '../actions/types'

const initialState = {
    orders: [],
    loading: false
}

const orderReducer = (state=initialState, action) => {
    switch (action.type) {
        case ORDER_SUCCESSFUL:
            const order = {
                ...action.orderDetails,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(order),
                loading: false
            }
        case ORDER_FAILED:
            return {
                ...state,
                loading: false
            }
        case ORDER_START:
            return {
                ...state,
                loading: true
            }
    
        default:
            return state
    }
}


export default orderReducer