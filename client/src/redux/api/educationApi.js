import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const getBackendUrl = () => {
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return "http://localhost:5000";
    }
    return import.meta.env.VITE_BACKEND_URL || "https://bhagwan-gire-portfolio-server.vercel.app";
};

export const educationApi = createApi({
    reducerPath: "educationApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${getBackendUrl()}/api/education`, credentials: "include" }),
    tagTypes: ["education"],
    endpoints: (builder) => {
        return {
            getAllEducation: builder.query({
                query: () => {
                    return {
                        url: "/get-all-education",
                        method: "GET"
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["education"]
            }),

            addEducation: builder.mutation({
                query: educationData => {
                    return {
                        url: "/add-education",
                        method: "POST",
                        body: educationData
                    }
                },
                invalidatesTags: ["education"]
            }),
            deleteEducation: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-education/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["education"]
            }),

        }
    }
})

export const {
    useGetAllEducationQuery,
    useAddEducationMutation,
    useDeleteEducationMutation,
    useLazyGetAllEducationQuery
} = educationApi
