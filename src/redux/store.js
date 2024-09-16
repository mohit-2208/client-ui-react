import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { getStepsReducer } from '../redux/reducers/stepReducers';
import { getUserDetailsReducer } from '../redux/reducers/userDetailsReducer';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage
};

// Combine reducers
const rootReducer = combineReducers({
  getStepsReducer,
  getUserDetailsReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with redux-persist and thunk middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializableCheck to avoid issues with redux-persist
    }),
  devTools: process.env.REACT_APP_ENV !== 'production',
});

export default store;
export const persistor = persistStore(store);

