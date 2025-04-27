import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        // admin: JSON.parse(localStorage.getItem("Admin")),
        layout: JSON.parse(localStorage.getItem("Layout"))
    },
    reducers: {
        logoutAdmin: (state, { payload }) => {
            localStorage.removeItem("Admin")
            state.admin = null
        },
        changeLayout: (state, { payload }) => {
            state.layout = payload
            localStorage.setItem("Layout", JSON.stringify(payload))
        },
    },

    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.AdminLogin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.AdminLogout.matchFulfilled, (state, { payload }) => {
            localStorage.removeItem("Admin")
            state.admin = null
        })


})

export const { logoutAdmin, changeLayout } = authSlice.actions
export default authSlice.reducer