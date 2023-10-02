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
    }),
});

export const { useLoginMutation } = usersApiSlice; // for mutation, we use the useLoginMutation hook
