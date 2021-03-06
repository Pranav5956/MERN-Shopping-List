import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import { returnErrorsAction } from "./errorActions";
import { getItemsAction } from "./itemActions";

// Check token and load user
export const loadUserAction = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
      dispatch(getItemsAction());
    })
    .catch((err) => {
      dispatch(returnErrorsAction(err.response.data.msg, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register user
export const registerAction = ({ name, email, password }) => (dispatch) => {
  // Headers
  dispatch({ type: USER_LOADING });
  const config = { headers: { "Content-Type": "Application/json" } };
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(getItemsAction());
    })
    .catch((err) => {
      dispatch(
        returnErrorsAction(
          err.response.data.msg,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login user
export const loginAction = ({ email, password }) => (dispatch) => {
  // Headers
  dispatch({ type: USER_LOADING });
  const config = { headers: { "Content-Type": "Application/json" } };
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(getItemsAction());
    })
    .catch((err) => {
      dispatch(
        returnErrorsAction(
          err.response.data.msg,
          err.response.status,
          "LOGIN_FAIL"
        )
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout user
export const logoutAction = () => {
  return { type: LOGOUT_SUCCESS };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Header config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) config.headers["x-auth-token"] = token;

  return config;
};
