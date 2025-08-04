import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
import { LogOut } from "lucide-react";

const USER_API = "https://learning-management-system-peerlearn-1.onrender.com/api/v1/user";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
            }),
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // Check if data and user exist
                    if (result.data && result.data.user) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    } else {
                        console.error("Login data is missing or incomplete", result);
                    }
                } catch (error) {
                    console.log("Login error:", error);
                }
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log("Logout error:", error);
                }
            },
        }),
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // Check if data and user exist
                    if (result.data && result.data.user) {
                        dispatch(userLoggedIn({ user: result.data.user }));
                    } else {
                        console.error("Login data is missing or incomplete", result);
                    }
                } catch (error) {
                    console.log("Login error:", error);
                }
            },
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "/profile/update",
                method: "PUT",
                body: formData,
                credentials: "include"
            }),
        }),
    }),
});

export const { 
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useUpdateUserMutation,
    useLoadUserQuery 
} = authApi;
