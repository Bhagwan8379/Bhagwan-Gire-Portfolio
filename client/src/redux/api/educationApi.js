import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const educationApi = createApi({
    reducerPath: "educationApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/education`, credentials: "include" }),
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

export const { useGetAllEducationQuery, useAddEducationMutation, useDeleteEducationMutation } = educationApi
