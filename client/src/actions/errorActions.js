import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// RETURN ERRORS
export const returnErrorsAction = (msg, status, id = null) => {
  return { type: GET_ERRORS, payload: { msg, status, id } };
};

// CLEAR ERRORS
export const clearErrorsAction = () => {
  return { type: CLEAR_ERRORS };
};
