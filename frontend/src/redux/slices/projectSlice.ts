import { apiSlice } from './apiSlice';
const USERS_URL = 'project/';

export const projectSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectDetails: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: 'GET',
      }),
    }),
    getFileName: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: 'GET',
      }),
    }),
    create: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateName: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/title`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    updateSlot: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/slot`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    enterMarks: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/entermarks/${data.id}`,
        method: 'POST',
        body: data.marks,
      }),
    }),
  }),
});

export const {
  useGetProjectDetailsQuery,
  useGetFileNameQuery,
  useCreateMutation,
  useUpdateNameMutation,
  useUpdateSlotMutation,
} = projectSlice;
