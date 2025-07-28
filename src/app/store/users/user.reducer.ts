import { createReducer, on } from '@ngrx/store';
import { addUser, deleteUser, editUser, loadUsersFailure, loadUsersSuccess } from './user.actions';
import { IUser, UsersState } from '../../data/interfaces/user.interface';


export const initialState: UsersState = {
    users: [],
    error: null,
    loading: false
};

export const userReducer = createReducer(
    initialState,

    on(loadUsersSuccess, (state, action) => ({
        ...state,
        users: action.payload,
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
        users: state.users.filter(u => u.id !== id)
    })),

    on(editUser, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u)
    })),
)
