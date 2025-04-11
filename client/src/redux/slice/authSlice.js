import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: { admin: JSON.parse(localStorage.getItem("Admin")) },
    reducers: {
        logoutAdmin: (state, { payload }) => {
            localStorage.removeItem("Admin")
            state.admin = null
        },
    },

    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.AdminLogin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.AdminLogout.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })


})

export const { logoutAdmin } = authSlice.actions
export default authSlice.reducer