import {
  ORDER_SUCCESSFUL,
  ORDER_FAILED,
  ORDER_START,
  PURCHASED_REDIRECTION,
  FETCHING_ORDERS,
  LOGOUT_EMPTY_ORDERS
} from "./types";
import axios from "../../axios-instance";

export const order_successful = (orderId, orderDetails) => {
  return {
    type: ORDER_SUCCESSFUL,
    orderId: orderId,
    orderDetails: orderDetails,
  };
};

export const order_failed = (error) => {
  return {
    type: ORDER_FAILED,
    error: error,
  };
};

export const order_start = () => {
  return {
    type: ORDER_START,
  };
};

export const purchased_redirection = () => {
  return {
    type: PURCHASED_REDIRECTION,
  };
};

export const order_process_async = (order_data, token) => {
  return (dispatch) => {
    dispatch(order_start());
    axios
      .post("/orders.json?auth=" + token, order_data)
      .then((res) => dispatch(order_successful(res.data.name, order_data)))
      .catch((err) => dispatch(order_failed(err)));
  };
};

export const fetching_orders = (data) => {
  return {
    type: FETCHING_ORDERS,
    data: data,
  };
};

export const fetching_orders_async = (token, userId) => {
  return (dispatch) => {
    const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios
      .get("/orders.json" + queryParam)
      .then((res) => {
        dispatch(fetching_orders(res.data));
      })
      .catch((err) => {});
  };
};

export const emptyOrder = () => {
  return {
    type: LOGOUT_EMPTY_ORDERS
  }
}
