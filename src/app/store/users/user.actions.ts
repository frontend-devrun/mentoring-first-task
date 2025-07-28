import { createAction, props } from '@ngrx/store';
import { ApiError, IUser } from '../../data/interfaces/user.interface';

export const loadUsers = createAction('[Users Page] Load users');

export const loadUsersSuccess = createAction(
    '[Users API] Users Loaded Success',
    props<{ payload: IUser[] }>()
);

export const loadUsersFailure = createAction(
    '[Users API] Users Loaded Error',
    props<{ error: ApiError }>()
);

export const deleteUser = createAction(
    '[Users] Delete user',
    props<{ id: number }>()
);

export const addUser = createAction(
    '[Users] Add user',
    props<{ user: IUser }>()
);

export const editUser = createAction(
    '[Users] Edit user',
    props<{ user: IUser }>()
);
