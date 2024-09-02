import { STEP_STARTED, STEP_SUCCESS, STEP_FAILURE, STEP_UPDATE } from "../types/stepTypes";

const initialState = {
    data: null,
    loading: null,
    error: null,
    currentStep: null
};

export const getStepsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STEP_STARTED:
            return { ...state, loading: true, error: null };
        case STEP_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case STEP_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload
            };
        case STEP_UPDATE:
            return {
                ...state,
                currentStep: action.payload,
            };
        default:
            return state;
    }
};