import { CLEAR_ERRORS } from "../constants/clearErrorConstant"

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}
