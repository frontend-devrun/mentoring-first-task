import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "../../data/interfaces/user.interface";


export const selectUsersFeature = createFeatureSelector<UsersState>('users')

export const selectUsersList = createSelector(
    selectUsersFeature,
    state => state.users
)

export const selectUsersError = createSelector(
    selectUsersFeature,
    state => state.error
);