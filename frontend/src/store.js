import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Redux Toolkit's way of saying "don't touch this"
    devTools: true,
});

export default store;