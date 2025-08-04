import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { ApiError, IUser } from "../../data/interfaces/user.interface";
import { UsersApiService } from "../../data/services/users-api.service";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./user.actions";

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private usersServise = inject(UsersApiService);

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      concatMap(() =>
        this.usersServise.getUsers().pipe(
          map((users: IUser[]) => loadUsersSuccess({ payload: users })),
          catchError((error: ApiError) => of(loadUsersFailure({ error })))
        )
      )
    );
  });
}
