import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://major-project-backend-m0ty.onrender.com/api/',
  baseUrl: 'http://localhost:3000/api/',
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({}),
});
