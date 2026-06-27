import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const getBackendUrl = () => {
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return "http://localhost:5000";
    }
    return import.meta.env.VITE_BACKEND_URL || "https://bhagwan-gire-portfolio-server.vercel.app";
};

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${getBackendUrl()}/api/contact`, credentials: "include" }),
    tagTypes: ["contact"],
    endpoints: (builder) => {
        return {
            GetAllMessages: builder.query({
                query: () => {
                    return {
                        url: "/get-all-messages",
                        method: "GET",
                    }
                },
                transformResponse: data => data.result,
                providesTags: ["contact"]
            }),
            SendMessage: builder.mutation({
                query: contactData => {
                    return {
                        url: "/send-message",
                        method: "POST",
                        body: contactData
                    }
                },
                invalidatesTags: ["contact"]
            }),

            DeleteMessage: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-messages/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["contact"]
            }),

        }
    }
})

export const {
    useDeleteMessageMutation,
    useGetAllMessagesQuery,
    useSendMessageMutation,
    useLazyGetAllMessagesQuery
} = contactApi
