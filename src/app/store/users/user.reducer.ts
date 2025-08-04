import { createReducer, on } from "@ngrx/store";
import { IUser, UsersState } from "../../data/interfaces/user.interface";
import { addUser, deleteUser, editUser, loadUsersFailure, loadUsersSuccess } from "./user.actions";

export const initialState: UsersState = {
  users: [],
  error: null,
  loading: false
};

export const userReducer = createReducer(
  initialState,

  on(loadUsersSuccess, (state, action) => ({
    ...state,
    users: action.payload
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),

  on(deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((u: IUser) => u.id !== id)
  })),

  on(editUser, (state, { user }) => ({
    ...state,
    users: state.users.map((u: IUser) => (u.id === user.id ? user : u))
  }))
);
