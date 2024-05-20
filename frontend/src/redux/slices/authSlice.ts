import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../actionTypes';

// Define the initial state using that type
const initialState: State = {
  isAuthenticated: false,
  user: null,
  isMentor: false,
};

const authSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setCredentialsMentor: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isMentor = true;
    },
    logoutMentor: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isMentor = false;
    },
  },
});

export const { setCredentials, logout, setCredentialsMentor, logoutMentor } =
  authSlice.actions;

export default authSlice.reducer;
