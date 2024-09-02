import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { getStepsReducer } from '../redux/reducers/stepReducers';

const rootReducer = {
    getStepsReducer: getStepsReducer
};

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
