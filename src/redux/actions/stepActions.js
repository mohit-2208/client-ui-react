import { STEP_STARTED, STEP_SUCCESS, STEP_FAILURE, STEP_UPDATE } from "../types/stepTypes";
import { getData } from '../../commonHelpers/api';
import { toast } from "react-toastify";

// Fetch data and optionally update the step
export const getStepsData = (url, newStep) => async (dispatch) => {
    dispatch({ type: STEP_STARTED });
    try {
        const data = await getData(url);
        dispatch({
            type: STEP_SUCCESS,
            payload: data
        });
        if (newStep !== undefined) {
            dispatch(updateStep(newStep));
        }
        toast.success("Success");
    } catch (error) {
        dispatch({
            type: STEP_FAILURE,
            payload: {
                message: error.message,
                stack: error.stack
            }
        });
        toast.error(error.message);
    }
};

// Update the step independently
export const updateStep = (newStep) => ({
    type: STEP_UPDATE,
    payload: newStep,
});
