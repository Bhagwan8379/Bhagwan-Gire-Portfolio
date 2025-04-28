import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const x = import.meta.env.VITE_BACKEND_URL
export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${x}/api/projects`, credentials: "include" }),
    tagTypes: ["project"],
    endpoints: (builder) => {
        return {
            GetAllProjects: builder.query({
                query: () => {
                    console.log("url check", x);


                    return {
                        url: "/get-all-projects",
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["project"]
            }),
            AddProjects: builder.mutation({
                query: projectData => {
                    return {
                        url: "/add-projects",
                        method: "POST",
                        body: projectData
                    }
                },
                invalidatesTags: ["project"]
            }),

            DeleteProjects: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-project/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["project"]
            }),

        }
    }
})

export const { useGetAllProjectsQuery, useDeleteProjectsMutation, useAddProjectsMutation } = projectApi
