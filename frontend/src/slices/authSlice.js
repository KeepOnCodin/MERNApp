import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null, // if userInfo exists in localStorage, set it as initial state
};

const authSlice = createSlice({ 
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => { // set userInfo to localStorage and state
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => { // remove userInfo from localStorage and set it to null
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});


export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;