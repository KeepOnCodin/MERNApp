import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery =  fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // a tagtype is a way to group endpoints together
    endpoints: (builder) => ({}) // builder is an object that contains methods to define endpoints
});
