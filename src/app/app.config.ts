import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { userReducer } from "./store/users/user.reducer";
import { UsersEffects } from "./store/users/users.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ users: userReducer }),
    provideEffects([UsersEffects]),
    provideNoopAnimations(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
