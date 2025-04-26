import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./slice/authSlice";
import { contactApi } from "./api/contactApi";
import { projectApi } from "./api/projectsApi";
import { educationApi } from "./api/educationApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [educationApi.reducerPath]: educationApi.reducer,
        auth: authSlice
    },
    middleware: def => [
        ...def(),
        authApi.middleware,
        contactApi.middleware,
        projectApi.middleware,
        educationApi.middleware
    ]
})

export default reduxStore