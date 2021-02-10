import {ORDER_SUCCESSFUL, ORDER_FAILED, ORDER_START, PURCHASED_REDIRECTION, FETCHING_ORDERS} from '../actions/types'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
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
                loading: false,
                purchased: true
            }
        case ORDER_FAILED:
            return {
                ...state,
                loading: false
            }
        case ORDER_START:
            return {
                ...state,
                loading: true,
            }
        case PURCHASED_REDIRECTION:
            return {
                ...state,
                purchased: false
            }
        case FETCHING_ORDERS:
            const temporary_orders = []
            for(let key in action.data){
                temporary_orders.push({
                    ...action.data[key],
                    id: key
                })
            }
            return {
                ...state,
                orders: state.orders.concat(temporary_orders)
            }

        default:
            return state
    }
}


export default orderReducer