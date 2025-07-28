import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, exhaustMap, catchError, of } from "rxjs";
import { UsersApiService } from "../../data/services/users-api.service";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./user.actions";

@Injectable()

export class UsersEffects {
    private actions$ = inject(Actions)
    private usersServise = inject(UsersApiService)

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadUsers),
            exhaustMap(() => this.usersServise.getUsers()
                .pipe(
                    map(users => loadUsersSuccess({ payload: users })),
                    catchError(error => of(loadUsersFailure({ error: error.message })))
                )

            )
        )
    })
}


