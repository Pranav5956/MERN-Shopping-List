import axios from "axios";

import { tokenConfig } from "./authActions";
import { returnErrorsAction } from "./errorActions";

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItemsAction = () => (dispatch) => {
  dispatch(setItemsLoadingAction());
  axios
    .get("/api/items")
    .then((res) => dispatch({ type: GET_ITEMS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrorsAction(err.response.data.msg, err.response.status))
    );
};

export const addItemAction = (item) => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_ITEM, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrorsAction(err.response.data.msg, err.response.status))
    );
};

export const deleteItemAction = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then((res) => dispatch({ type: DELETE_ITEM, payload: id }))
    .catch((err) =>
      dispatch(returnErrorsAction(err.response.data.msg, err.response.status))
    );
};

export const setItemsLoadingAction = () => {
  return { type: ITEMS_LOADING };
};
