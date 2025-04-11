import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Meta } from "react-router-dom"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            AdminLogin: builder.mutation({
                query: authData => {
                    return {
                        url: "/login-admin",
                        method: "POST",
                        body: authData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("Admin", JSON.stringify(data.data))
                    return data.data
                },
                invalidatesTags: ["auth"]
            }),
            AdminRegister: builder.mutation({
                query: authData => {
                    return {
                        url: "/register-admin",
                        method: "POST",
                        body: authData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            AdminLogout: builder.mutation({
                query: authData => {
                    return {
                        url: "/logout-admin",
                        method: "POST",
                        body: authData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("Admin")
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const { useAdminLoginMutation, useAdminRegisterMutation, useAdminLogoutMutation } = authApi
