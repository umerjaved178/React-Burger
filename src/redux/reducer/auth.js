import {
  START_AUTH,
  SUCCESS_AUTH,
  FAILED_AUTH,
  LOGOUT_AUTH,
} from "../actions/types";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_AUTH:
      return {
        loading: true,
        error: null,
      };
    case SUCCESS_AUTH:
      return {
        loading: false,
        token: action.token,
        userId: action.id,
        error: null,
      };
    case FAILED_AUTH:
      return {
        loading: false,
        error: action.error,
      };
    case LOGOUT_AUTH:
      return {
        token: null,
        userId: null,
      };

    default:
      return state;
  }
};

export default authReducer;
