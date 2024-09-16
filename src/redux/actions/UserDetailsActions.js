import { USER_DETAIL_STARTED, USER_DETAIL_SUCCESS, USER_DETAIL_FAILURE } from "../types/userDetailsTypes";

export const getUserData = (data) => async (dispatch) => {
    dispatch({ type: USER_DETAIL_STARTED });
    try {
        // Here, we handle the user data
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAILURE,
            payload: {
                message: error.message,
                stack: error.stack
            }
        });
    }
};

