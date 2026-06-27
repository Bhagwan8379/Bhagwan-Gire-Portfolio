import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const getBackendUrl = () => {
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return "http://localhost:5000";
    }
    return import.meta.env.VITE_BACKEND_URL || "https://bhagwan-gire-portfolio-server.vercel.app";
};

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${getBackendUrl()}/api/projects`, credentials: "include" }),
    tagTypes: ["project"],
    endpoints: (builder) => {
        return {
            GetAllProjects: builder.query({
                query: () => {
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

export const {
    useGetAllProjectsQuery,
    useDeleteProjectsMutation,
    useAddProjectsMutation,
    useLazyGetAllProjectsQuery
} = projectApi
