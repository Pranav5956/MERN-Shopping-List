import {
  GET_ITEMS,
  CLEAR_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

const dispatch = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload, loading: false };

    case CLEAR_ITEMS:
      return { initialState };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        loading: false,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false,
      };

    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id !== action.payload._id) return item;
          return action.payload;
        }),
        loading: false,
      };

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default dispatch;
