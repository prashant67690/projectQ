import { apiSlice } from './apiSlice';
const USERS_URL = 'student/';

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
    }),
    assignMentor: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}assign/${data.id}`,
        method: 'POST',
        body: [...data.body],
      }),
    }),
    getMentor: builder.query({
      query: (data) => ({
        url: `mentor/${data.id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAssignMentorMutation,
  useUpdateUserMutation,
  useLogoutQuery,
  useGetMentorQuery,
} = studentApiSlice;
