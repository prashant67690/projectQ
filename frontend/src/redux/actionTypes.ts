// state types

export type State = {
  isAuthenticated: boolean;
  user: User;
  isMentor: boolean;
};

export type FileState = {
  file: File;
};

export type File = {
  id: number;
  title: string | null;
  synopsis: string | null;
  joiningReport: string | null;
  completionCertificate: string | null;
  slot: string | null;
};

export type User = {
  success: boolean;
  data: UserData;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  marks: number | null;
  mentorId: number | null;
};

// something
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
