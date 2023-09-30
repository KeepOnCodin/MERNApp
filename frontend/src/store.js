import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer, // add the apiSlice reducer to the store
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Redux Toolkit's way of saying "don't touch this"
    devTools: true,
});

export default store;