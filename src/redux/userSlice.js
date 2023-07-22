// const initialState = {
//     user: null,
// };
// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case LOGIN_USER:
//             const { user } = action;
//             sessionStorage.setItem('user', JSON.stringify(user));
//             return { ...state, user };
//         case LOGOUT_USER:
//             sessionStorage.removeItem('user');
//             return { ...state, user: null };
//         default:
//             return state;
//     }
// }
// export const LOGIN_USER = 'LOGIN_USER';
// export const LOGOUT_USER = 'LOGOUT_USER';
// export function loginUser(user) {
//     return { type: LOGIN_USER, user };
// }
// export function logoutUser() {
//     return { type: LOGOUT_USER };
// }
// ----------------------

// import {createSlice} from "@reduxjs/toolkit";
//
// const initialState = {
//     user : null
// }
// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         loginSuccess: (state,action)=>{
//             state.user = action.payload.user;
//             sessionStorage.setItem("user", action.payload.user);
//         },
//         logoutSuccess: (state,action) => {
//             sessionStorage.removeItem("user")
//         }
//     }
// })
// export const {
//     loginSuccess,
//     logoutSuccess
// } = userSlice.actions;
//
// export default userSlice.reducer;


//
//
//
// -----------------
// import {createSlice, current} from "@reduxjs/toolkit";
// import {loginUser} from "../authen/Login";
//
// const initialState = {
//     user:  JSON.parse(sessionStorage.getItem('user'))
// }
//
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     extraReducers: builder => {
//         builder.addCase(loginUser.fulfilled, (state, action) => {
//             state.user = action.payload.data;
//             localStorage.setItem('user', JSON.stringify(action.payload.data))
//         })
//     }
// })
//
// export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoggedIn: false,
    user: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure(state, action) {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;