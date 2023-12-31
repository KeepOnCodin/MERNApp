import { apiSlice } from "./apiSlice";
const USER_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({ // injectEnpoints will create inputs and inject them into the apiSlice using dependency injection
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${USER_URL}/auth`,
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = usersApiSlice; // for mutation, we use the useLoginMutation hook
