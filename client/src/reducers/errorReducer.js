import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null,
};

const dispatch = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        ...action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default dispatch;
