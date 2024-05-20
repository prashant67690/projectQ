import { apiSlice } from './apiSlice';
const USERS_URL = 'mentor/';

export const mentorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allMentor: builder.query({
      query: () => ({
        url: `${USERS_URL}/`,
        method: 'GET',
      }),
    }),
    mlogin: builder.mutation({
      query: (data) => ({
        url: 'auth/mentor/login',
        method: 'POST',
        body: data,
      }),
    }),
    mlogout: builder.query({
      query: () => ({
        url: 'auth/mentor/logout',
        method: 'GET',
      }),
    }),
    mregister: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    mupdateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
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
  useMloginMutation,
  useMlogoutQuery,
  useMregisterMutation,
  useMupdateUserMutation,
  useEnterMarksMutation,
  useAllMentorQuery,
} = mentorApiSlice;
