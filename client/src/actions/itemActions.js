import axios from "axios";

import { tokenConfig } from "./authActions";
import { returnErrorsAction } from "./errorActions";

import {
  GET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  CLEAR_ITEMS,
} from "./types";

export const getItemsAction = () => (dispatch, getState) => {
  dispatch(setItemsLoadingAction());
  axios
    .get("/api/items", tokenConfig(getState))
    .then((res) => dispatch({ type: GET_ITEMS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrorsAction(err.response.data.msg, err.response.status))
    );
};

export const addItemAction = (item) => (dispatch, getState) => {
  dispatch(setItemsLoadingAction());
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_ITEM, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrorsAction(err.response.data.msg, err.response.status))
    );
};

export const updateItemAction = (id, itemParams) => (dispatch, getState) => {
  dispatch(setItemsLoadingAction());
  axios
    .put(`/api/items/${id}`, itemParams, tokenConfig(getState))
    .then((res) => dispatch({ type: UPDATE_ITEM, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrorsAction(err.response.data.msg, err.response.status))
    );
};

export const deleteItemAction = (id) => (dispatch, getState) => {
  dispatch(setItemsLoadingAction());
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

export const clearItemsAction = () => {
  return { type: CLEAR_ITEMS };
};
