import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
// import { studentReducer } from './reducers/studentReducer';
// import { mentorReducer } from './reducers/mentorReducer';
// import { adminReducer } from "./reducers/adminReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // student: studentReducer,
    // mentor: mentorReducer,
    // admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

export const server = 'https://major-project-backend-m0ty.onrender.com/api/';
