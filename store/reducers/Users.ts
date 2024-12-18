import { IUser, IUsersState } from "@/models/Users";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUsersState = {
  isLoading: false,
  users: [],
  error: false,
  selectedUser: undefined,
};

const usersReducers = {
  fetchUsers: (state: Draft<IUsersState>) => {
    state.isLoading = true;
  },
  fetchUsersSuccess: (
    state: Draft<IUsersState>,
    action: PayloadAction<IUser[]>
  ) => {
    state.isLoading = false;
    state.users = action.payload;
  },
  fetchUsersFailed: (
    state: Draft<IUsersState>,
    action: PayloadAction<unknown>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  setSelectedUser: (
    state: Draft<IUsersState>,
    action: PayloadAction<IUser>
  ) => {
    state.isLoading = false;
    state.selectedUser = action.payload;
  },
  resetSelectedUser: (state: Draft<IUsersState>) => {
    state.selectedUser = initialState.selectedUser;
  },
};

export const UsersSlice = createSlice({
  name: "USERS",
  initialState,
  reducers: {
    ...usersReducers,
  },
});

export const {
  fetchUsers,
  fetchUsersFailed,
  fetchUsersSuccess,
  setSelectedUser,
  resetSelectedUser,
} = UsersSlice.actions;

export default UsersSlice.reducer;
