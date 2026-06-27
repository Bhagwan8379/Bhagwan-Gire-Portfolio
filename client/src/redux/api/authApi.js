import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const getBackendUrl = () => {
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return "http://localhost:5000";
    }
    return import.meta.env.VITE_BACKEND_URL || "https://bhagwan-gire-portfolio-server.vercel.app";
};

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${getBackendUrl()}/api/auth`, credentials: "include" }),
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

            VoiceLoginAdmin: builder.mutation({
                query: audioData => {
                    const formData = new FormData();
                    formData.append('audio', audioData);
                    return {
                        url: "/voice-login-admin",
                        method: "POST",
                        body: formData,
                    }
                },
                transformResponse: data => {
                    if (data.success) {
                        localStorage.setItem("Admin", JSON.stringify(data.data))
                    }
                    return data; // Return the full response for handling in the component
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

export const { useAdminLoginMutation, useVoiceLoginAdminMutation, useAdminLogoutMutation } = authApi
