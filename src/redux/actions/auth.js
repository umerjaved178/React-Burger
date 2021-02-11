import { START_AUTH, SUCCESS_AUTH, FAILED_AUTH, LOGOUT_AUTH } from "./types";
import axios from "axios";

export const start_auth = () => {
  return {
    type: START_AUTH,
  };
};

export const success_auth = (token, id) => {
  return {
    type: SUCCESS_AUTH,
    token: token,
    id: id,
  };
};

export const failed_auth = (error) => {
  return {
    type: FAILED_AUTH,
    error: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_AUTH,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth_async = (email, password, inSignupMode) => {
  return (dispatch) => {
    dispatch(start_auth());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdO3p303VtNd0MYoTlKKCry2D2fO-GBHc";
    if (!inSignupMode) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdO3p303VtNd0MYoTlKKCry2D2fO-GBHc";
    }

    axios
      .post(url, authData)
      .then((res) => {
        console.log(res.data);
        dispatch(success_auth(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(failed_auth(err.response.data.error));
      });
  };
};
