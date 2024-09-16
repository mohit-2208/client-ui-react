import { USER_DETAIL_STARTED, USER_DETAIL_SUCCESS, USER_DETAIL_FAILURE } from "../types/userDetailsTypes";

const initialUserState = {
    userInfo: null,
    loading: false,
    error: null,
};

export const getUserDetailsReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case USER_DETAIL_STARTED:
            return { ...state, loading: true, error: null };
        case USER_DETAIL_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload }; // Store user info
        case USER_DETAIL_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload
            };
        default:
            return state;
    }
};
