import { CLEAR_ERRORS } from "./actionTypes/clearErrorActionTypes"

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
