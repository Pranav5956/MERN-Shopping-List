import axios from "axios";

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItemsAction = () => (dispatch) => {
  dispatch(setItemsLoadingAction());
  axios
    .get("/api/items")
    .then((res) => dispatch({ type: GET_ITEMS, payload: res.data }));
};

export const addItemAction = (item) => (dispatch) => {
  axios
    .post("/api/items", item)
    .then((res) => dispatch({ type: ADD_ITEM, payload: res.data }));
};

export const deleteItemAction = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) => dispatch({ type: DELETE_ITEM, payload: id }));
};

export const setItemsLoadingAction = () => {
  return { type: ITEMS_LOADING };
};
